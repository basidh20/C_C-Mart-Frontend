import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "#2d5016", marginBottom: "0.5rem" }}>
            👋🌾🏪 Welcome Back!
          </h1>
          <p style={{ color: "#666", margin: 0 }}>
            Sign in to your C-C Mart account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "1.5rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
                color: "#2d5016",
              }}
            >
              📧✨📝 Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e8f5e8",
                borderRadius: "8px",
                fontSize: "1rem",
                transition: "border-color 0.3s",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
                color: "#2d5016",
              }}
            >
              🔑✨💫 Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e8f5e8",
                borderRadius: "8px",
                fontSize: "1rem",
                transition: "border-color 0.3s",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                padding: "0.75rem",
                background: "#ffe8e8",
                color: "#d63384",
                borderRadius: "4px",
                border: "1px solid #f5c6cb",
              }}
            >
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "1rem",
              background: isLoading ? "#ccc" : "#7ba428",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {isLoading ? "⏳ Signing In..." : "🌟✨🔑 Sign In"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            padding: "1rem 0",
            borderTop: "1px solid #e8f5e8",
          }}
        >
          <p style={{ margin: 0, color: "#666" }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#7ba428",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Sign up here
            </Link>
          </p>
        </div>

        <div
          style={{
            background: "#e8f5e8",
            padding: "1rem",
            borderRadius: "4px",
            marginTop: "1rem",
            fontSize: "0.9rem",
            color: "#2d5016",
          }}
        >
          <p style={{ margin: 0, textAlign: "center" }}>
            <strong>🎯📋✨ Demo Credentials:</strong>
            <br />
            Email: demo@ccmart.com
            <br />
            Password: demo123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
