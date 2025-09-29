import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { state: cartState } = useCart();
  const { state: authState, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const cartItemCount = cartState.items.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #2d5016 0%, #3a6b1d 100%)",
        padding: "1rem 2rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          🌾🏪🌱 C-C Mart
        </Link>

        <form
          onSubmit={handleSearch}
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              marginRight: "0.5rem",
              borderRadius: "20px",
              border: "none",
              outline: "none",
              fontSize: "0.9rem",
              minWidth: "250px",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#7ba428",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#689520")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#7ba428")}
          >
            Search
          </button>
        </form>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link
            to="/cart"
            style={{
              color: "white",
              textDecoration: "none",
              background: cartItemCount > 0 ? "#7ba428" : "transparent",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              border: "2px solid #7ba428",
              transition: "all 0.3s ease",
              fontWeight: "500",
            }}
          >
            🛒 Cart ({cartItemCount})
          </Link>

          {authState.isAuthenticated ? (
            <div
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span>👋 Hello, {authState.user?.name}</span>
              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  color: "white",
                  border: "2px solid #7ba428",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#7ba428";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                  padding: "0.5rem 1rem",
                  border: "2px solid #7ba428",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  fontWeight: "500",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#7ba428";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                🔑 Login
              </Link>
              <Link
                to="/signup"
                style={{
                  color: "white",
                  textDecoration: "none",
                  background: "#7ba428",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  fontWeight: "500",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#689520";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#7ba428";
                }}
              >
                ✨ Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
