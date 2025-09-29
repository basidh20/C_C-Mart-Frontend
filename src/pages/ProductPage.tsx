import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { productService } from "../services/productService";
import { getImageUrl } from "../services/apiClient";

// Mock product data (same as HomePage)
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Fresh Red Apples",
    description:
      "Crisp and juicy red apples, freshly picked from our orchard. These premium quality apples are perfect for snacking, baking, or adding to your favorite recipes. Rich in vitamins and antioxidants, they're a healthy choice for the whole family.",
    price: 4.99,
    quantity: 25,
    category: "Fruits",
    image: "/uploads/images/apple.jpg",
  },
  {
    id: 2,
    name: "Whole Chicken",
    description:
      "Farm-fresh whole chicken, free-range and organic. Raised on our local farm with care and without antibiotics or hormones. Perfect for roasting, grilling, or making your favorite chicken dishes. Currently out of stock but will be restocked soon!",
    price: 12.99,
    quantity: 0,
    category: "Meat",
    image: "/uploads/images/chicken.jpg",
  },
  {
    id: 3,
    name: "Fresh Milk Bread",
    description:
      "Soft and fluffy bread made with fresh farm milk and high-quality ingredients. Perfect for sandwiches, toast, or just enjoying with butter and jam. Baked fresh daily in our local bakery.",
    price: 3.49,
    quantity: 15,
    category: "Bakery",
    image: "/uploads/images/bread.jpg",
  },
];

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productId = id ? parseInt(id) : 0;
        const apiProduct = await productService.getProductById(productId);
        setProduct(apiProduct);
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Failed to load product. Using fallback data.");
        // Fall back to mock data on error
        const productId = id ? parseInt(id) : 0;
        const foundProduct = mockProducts.find((p) => p.id === productId);
        setProduct(foundProduct || null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.quantity > 0) {
      addToCart(product);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading product...</h2>
        <div style={{ fontSize: "2rem", marginTop: "1rem" }}>🔄</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Product not found</h2>
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.5rem 1rem",
            background: "#7ba428",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "0.5rem 1rem",
          background: "#2d5016",
          color: "white",
          border: "none",
          borderRadius: "4px",
          marginBottom: "2rem",
        }}
      >
        ← Back to Products
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4/3",
            maxHeight: "450px",
            overflow: "hidden",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            border: "2px solid #f1f3f4",
            padding: "12px",
          }}
        >
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              filter: "brightness(1.01) contrast(1.05) saturate(1.08)",
              transition: "transform 0.3s ease, filter 0.3s ease",
              imageRendering: "crisp-edges",
            }}
            loading="eager"
            onLoad={(e) => {
              (e.target as HTMLImageElement).style.backgroundColor =
                "transparent";
            }}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src =
                "https://via.placeholder.com/400x300/f8f9fa/6c757d?text=Product+Image+Not+Available";
              img.style.objectFit = "contain";
              img.style.filter = "none";
              img.style.padding = "1rem";
            }}
            onMouseOver={(e) => {
              (e.target as HTMLImageElement).style.transform = "scale(1.02)";
              (e.target as HTMLImageElement).style.filter =
                "brightness(1.02) contrast(1.08) saturate(1.12)";
            }}
            onMouseOut={(e) => {
              (e.target as HTMLImageElement).style.transform = "scale(1)";
              (e.target as HTMLImageElement).style.filter =
                "brightness(1.01) contrast(1.05) saturate(1.08)";
            }}
          />
          {/* Premium image border overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(135deg, rgba(123,164,40,0.05) 0%, rgba(45,80,22,0.05) 100%)",
              pointerEvents: "none",
              borderRadius: "12px",
            }}
          />
          {/* Corner accent */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "40px",
              height: "40px",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              color: "#7ba428",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            🏷️
          </div>
        </div>

        <div>
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "1rem",
              color: "#2d5016",
            }}
          >
            {product.name}
          </h1>

          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                background: "#7ba428",
                color: "white",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.9rem",
              }}
            >
              {product.category}
            </span>
          </div>

          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              marginBottom: "2rem",
              color: "#666",
            }}
          >
            {product.description}
          </p>

          <div style={{ marginBottom: "2rem" }}>
            <span
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#7ba428" }}
            >
              Rs. {product.price.toFixed(2)}
            </span>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <span
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: product.quantity > 0 ? "green" : "red",
                padding: "0.5rem",
                background: product.quantity > 0 ? "#e8f5e8" : "#ffe8e8",
                borderRadius: "4px",
              }}
            >
              {product.quantity > 0
                ? `✓ ${product.quantity} in stock`
                : "❌ Out of stock"}
            </span>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              style={{
                flex: 1,
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                background: product.quantity === 0 ? "#ccc" : "#7ba428",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                transition: "background-color 0.3s",
              }}
            >
              {product.quantity === 0
                ? "Out of Stock"
                : addedToCart
                ? "✓ Added!"
                : "Add to Cart"}
            </button>

            <button
              onClick={() => navigate("/cart")}
              style={{
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                background: "transparent",
                color: "#2d5016",
                border: "2px solid #2d5016",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              View Cart
            </button>
          </div>

          {product.quantity === 0 && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "#fff3cd",
                border: "1px solid #ffeaa7",
                borderRadius: "4px",
              }}
            >
              <p style={{ margin: 0, color: "#856404" }}>
                ⚠️ This item is currently out of stock. We're working hard to
                restock it soon! Check back later or add it to your wishlist.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
