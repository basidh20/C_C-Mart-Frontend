import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../services/apiClient";

const CartPage: React.FC = () => {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const total = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (state.items.length === 0) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            padding: "3rem",
            background: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <h1>🛒💫🌟 Your Cart is Empty</h1>
          <p
            style={{ fontSize: "1.2rem", color: "#666", marginBottom: "2rem" }}
          >
            Looks like you haven't added anything to your cart yet. Browse our
            fresh products and find something you love!
          </p>
          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "1rem 2rem",
              background: "#7ba428",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
            }}
          >
            🌟🛒✨ Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>🛒🌟💫 Your Shopping Cart</h1>
        <button
          onClick={clearCart}
          style={{
            padding: "0.5rem 1rem",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear Cart
        </button>
      </div>

      <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
        {state.items.map((item) => (
          <div
            key={item.product.id}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr auto auto auto",
              gap: "1rem",
              alignItems: "center",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "white",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "80px",
                height: "80px",
                flexShrink: 0,
                overflow: "hidden",
                borderRadius: "6px",
                backgroundColor: "#ffffff",
                border: "1px solid #e9ecef",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px",
              }}
            >
              <img
                src={getImageUrl(item.product.image)}
                alt={item.product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  filter: "brightness(1.02) contrast(1.03) saturate(1.05)",
                  transition: "transform 0.2s ease",
                  imageRendering: "crisp-edges",
                }}
                loading="lazy"
                onLoad={(e) => {
                  (e.target as HTMLImageElement).style.backgroundColor =
                    "transparent";
                }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src =
                    "https://via.placeholder.com/72x72/f8f9fa/6c757d?text=N/A";
                  img.style.objectFit = "contain";
                  img.style.filter = "none";
                  img.style.padding = "4px";
                }}
                onMouseOver={(e) => {
                  (e.target as HTMLImageElement).style.transform =
                    "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  (e.target as HTMLImageElement).style.transform = "scale(1)";
                }}
              />
              {/* Quality indicator dot */}
              <div
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "8px",
                  height: "8px",
                  background: "#28a745",
                  borderRadius: "50%",
                  border: "1px solid white",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              />
            </div>

            <div>
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{item.product.name}</h3>
              <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                {item.product.category}
              </p>
              <p
                style={{
                  margin: "0.5rem 0 0 0",
                  fontWeight: "bold",
                  color: "#7ba428",
                }}
              >
                Rs. {item.product.price.toFixed(2)} each
              </p>
            </div>

            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <button
                onClick={() =>
                  handleQuantityChange(item.product.id, item.quantity - 1)
                }
                style={{
                  width: "30px",
                  height: "30px",
                  background: "#f8f9fa",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                -
              </button>
              <span style={{ padding: "0 1rem", fontWeight: "bold" }}>
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  handleQuantityChange(item.product.id, item.quantity + 1)
                }
                style={{
                  width: "30px",
                  height: "30px",
                  background: "#f8f9fa",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold" }}>
                Rs. {(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.product.id)}
              style={{
                padding: "0.5rem",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem",
          background: "#f8f9fa",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: "1.2rem" }}>
            Items: {state.items.reduce((sum, item) => sum + item.quantity, 0)}
          </p>
        </div>
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#2d5016",
            }}
          >
            Total: Rs. {total.toFixed(2)}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          style={{
            padding: "1rem 2rem",
            background: "transparent",
            color: "#2d5016",
            border: "2px solid #2d5016",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            textAlign: "center",
          }}
        >
          ← Continue Shopping
        </Link>

        <button
          onClick={() => navigate("/checkout")}
          disabled={state.items.length === 0}
          style={{
            flex: 1,
            maxWidth: "300px",
            padding: "1rem 2rem",
            background: "#7ba428",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          �� Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
