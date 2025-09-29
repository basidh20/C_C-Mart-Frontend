import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { productService } from "../services/productService";
import { getImageUrl } from "../services/apiClient";

// Mock product data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Fresh Red Apples",
    description: "Crisp and juicy red apples, freshly picked from our orchard.",
    price: 4.99,
    quantity: 25,
    category: "Fruits",
    image: "/uploads/images/apple.jpg",
  },
  {
    id: 2,
    name: "Whole Chicken",
    description: "Farm-fresh whole chicken, free-range and organic.",
    price: 12.99,
    quantity: 0, // Out of stock
    category: "Meat",
    image: "/uploads/images/chicken.jpg",
  },
  {
    id: 3,
    name: "Fresh Milk Bread",
    description: "Soft and fluffy bread made with fresh farm milk.",
    price: 3.49,
    quantity: 15,
    category: "Bakery",
    image: "/uploads/images/bread.jpg",
  },
];

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiProducts = await productService.getAllProducts();
        setProducts(apiProducts);
        setFilteredProducts(apiProducts);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(apiProducts.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products. Using offline data.");
        // Fall back to mock data on error
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);

        // Extract categories from mock data
        const uniqueCategories = Array.from(
          new Set(mockProducts.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const searchTerm = searchParams.get("search");
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchParams, products, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    if (product.quantity > 0) {
      addToCart(product);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Loading products...</h2>
        <div style={{ fontSize: "2rem", marginTop: "1rem" }}>🔄</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      {error && (
        <div
          style={{
            background: "#ffe8e8",
            color: "#d63384",
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "1rem",
            border: "1px solid #f5c6cb",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <h1>🌾 Welcome to C-C Mart</h1>
      <p>Your trusted country store for fresh, quality products</p>

      {/* Category Filter */}
      <div
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          background: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
        }}
      >
        <h3 style={{ marginBottom: "1rem", color: "#2d5016" }}>
          🏷️ Filter by Category
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <button
            onClick={() => handleCategoryChange("")}
            style={{
              padding: "0.5rem 1rem",
              border: "2px solid #7ba428",
              borderRadius: "20px",
              background: selectedCategory === "" ? "#7ba428" : "white",
              color: selectedCategory === "" ? "white" : "#7ba428",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              if (selectedCategory !== "") {
                e.currentTarget.style.background = "#7ba428";
                e.currentTarget.style.color = "white";
              }
            }}
            onMouseOut={(e) => {
              if (selectedCategory !== "") {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#7ba428";
              }
            }}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              style={{
                padding: "0.5rem 1rem",
                border: "2px solid #7ba428",
                borderRadius: "20px",
                background: selectedCategory === category ? "#7ba428" : "white",
                color: selectedCategory === category ? "white" : "#7ba428",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = "#7ba428";
                  e.currentTarget.style.color = "white";
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "#7ba428";
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
        {selectedCategory && (
          <p
            style={{
              marginTop: "1rem",
              marginBottom: "0",
              color: "#6c757d",
              fontStyle: "italic",
            }}
          >
            Showing products in: <strong>{selectedCategory}</strong>
          </p>
        )}
      </div>

      {/* Results Summary */}
      <div
        style={{
          marginBottom: "1rem",
          color: "#6c757d",
          fontSize: "0.9rem",
        }}
      >
        {searchParams.get("search") && (
          <span>Search results for "{searchParams.get("search")}" • </span>
        )}
        Showing {filteredProducts.length} of {products.length} products
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
          marginTop: "1rem",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #e9ecef",
              borderRadius: "12px",
              padding: "1.25rem",
              background: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "220px",
                overflow: "hidden",
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #e9ecef",
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
                  transition: "transform 0.3s ease",
                  imageRendering: "crisp-edges",
                }}
                loading="lazy"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src =
                    "https://via.placeholder.com/300x220/f8f9fa/6c757d?text=Image+Not+Available";
                  img.style.objectFit = "contain";
                }}
                onMouseOver={(e) => {
                  (e.target as HTMLImageElement).style.transform =
                    "scale(1.02)";
                }}
                onMouseOut={(e) => {
                  (e.target as HTMLImageElement).style.transform = "scale(1)";
                }}
              />
              {/* Quality indicator */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#28a745",
                  borderRadius: "50%",
                  border: "2px solid white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <h3 style={{ margin: 0, flex: 1 }}>{product.name}</h3>
              <span
                style={{
                  background: "#7ba428",
                  color: "white",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  marginLeft: "0.5rem",
                }}
              >
                {product.category}
              </span>
            </div>
            <p style={{ margin: "0.5rem 0" }}>{product.description}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#7ba428",
                }}
              >
                Rs. {product.price.toFixed(2)}
              </span>
              <span style={{ color: product.quantity > 0 ? "green" : "red" }}>
                {product.quantity > 0
                  ? `${product.quantity} in stock`
                  : "Out of stock"}
              </span>
            </div>
            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
              <Link
                to={`/product/${product.id}`}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  background: "#2d5016",
                  color: "white",
                  textAlign: "center",
                  textDecoration: "none",
                  borderRadius: "4px",
                }}
              >
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.quantity === 0}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  background: product.quantity === 0 ? "#ccc" : "#7ba428",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                }}
              >
                {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && !loading && (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "3rem",
              color: "#6c757d",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <h3>No products found</h3>
            <p>
              {selectedCategory && searchParams.get("search")
                ? `No products found in "${selectedCategory}" category matching "${searchParams.get(
                    "search"
                  )}"`
                : selectedCategory
                ? `No products found in "${selectedCategory}" category`
                : searchParams.get("search")
                ? `No products found matching "${searchParams.get("search")}"`
                : "No products available"}
            </p>
            {(selectedCategory || searchParams.get("search")) && (
              <button
                onClick={() => {
                  setSelectedCategory("");
                  window.history.pushState({}, "", window.location.pathname);
                }}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#7ba428",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "1rem",
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
