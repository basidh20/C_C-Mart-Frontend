import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      await signup(fullName, formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError("Failed to create account. Please try again.");
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
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "#2d5016", marginBottom: "0.5rem" }}>
            🌟🌾🏪 Join C-C Mart!
          </h1>
          <p style={{ color: "#666", margin: 0 }}>
            Create your account to start shopping fresh, quality products
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "1.5rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
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
                👤✨📝 First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e8f5e8",
                  borderRadius: "8px",
                  fontSize: "1rem",
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
                👤🌟📝 Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid #e8f5e8",
                  borderRadius: "8px",
                  fontSize: "1rem",
                }}
              />
            </div>
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
              📧✨💌 Email Address
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
              🔑✨🛡️ Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password (min 6 characters)"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e8f5e8",
                borderRadius: "8px",
                fontSize: "1rem",
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
              🔑🔒✅ Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e8f5e8",
                borderRadius: "8px",
                fontSize: "1rem",
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
            }}
          >
            {isLoading ? "⏳ Creating Account..." : "🌟✨🎯 Create Account"}
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
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#7ba428",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Sign in here
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
            <strong>🎯📋✨ Demo Account:</strong>
            <br />
            You can also use our demo account to explore the store without
            signing up!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
