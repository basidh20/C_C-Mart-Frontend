import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CheckoutPage: React.FC = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "card",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const total = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryFee = 5.99;
  const finalTotal = total + deliveryFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);

      // Clear cart and show delivery alert
      clearCart();

      // Show delivery tracking alert
      alert(`��� Order Confirmed! 
      
Order Details:
• Order ID: #CCM${Date.now()}
• Total: Rs. ${finalTotal.toFixed(2)}
• Delivery Address: ${formData.address}, ${formData.city}

��� Delivery Information:
Your order is being prepared and will be delivered within 2-3 business days.

��� You will receive SMS/Email updates at:
• Phone: ${formData.phone}
• Email: ${formData.email}

Track your delivery:
• Preparation: 30 minutes
• Dispatch: 2-4 hours  
• Delivery: 1-3 days

Thank you for shopping with C-C Mart! ���`);

      navigate("/");
    }, 2000);
  };

  if (state.items.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Your cart is empty</h2>
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
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>��� Checkout</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 400px",
          gap: "3rem",
          marginTop: "2rem",
        }}
      >
        {/* Checkout Form */}
        <div>
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: "1.5rem" }}
          >
            <div>
              <h2 style={{ color: "#2d5016", marginBottom: "1rem" }}>
                ��� Contact Information
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>

            <div>
              <h2 style={{ color: "#2d5016", marginBottom: "1rem" }}>
                ��� Delivery Address
              </h2>
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  width: "100%",
                  marginBottom: "1rem",
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 200px",
                  gap: "1rem",
                }}
              >
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>

            <div>
              <h2 style={{ color: "#2d5016", marginBottom: "1rem" }}>
                ��� Payment Method
              </h2>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                <option value="card">Credit/Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              style={{
                padding: "1rem 2rem",
                background: isProcessing ? "#ccc" : "#7ba428",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: isProcessing ? "not-allowed" : "pointer",
                marginTop: "1rem",
              }}
            >
              {isProcessing ? "⏳ Processing..." : "��� Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div
            style={{
              padding: "1.5rem",
              background: "#f8f9fa",
              borderRadius: "8px",
              position: "sticky",
              top: "2rem",
            }}
          >
            <h2 style={{ color: "#2d5016", marginBottom: "1rem" }}>
              ��� Order Summary
            </h2>

            <div style={{ marginBottom: "1rem" }}>
              {state.items.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>
                    Rs. {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #ddd",
                margin: "1rem 0",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span>Subtotal:</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <span>Delivery Fee:</span>
              <span>Rs. {deliveryFee.toFixed(2)}</span>
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "2px solid #2d5016",
                margin: "1rem 0",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              <span>Total:</span>
              <span>Rs. {finalTotal.toFixed(2)}</span>
            </div>

            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem",
                background: "#e8f5e8",
                borderRadius: "4px",
              }}
            >
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#2d5016" }}>
                ��� <strong>Delivery Information:</strong>
                <br />
                Expected delivery: 2-3 business days
                <br />
                ��� You'll receive tracking updates via SMS & Email
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
