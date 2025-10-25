import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import {
  ShoppingCart,
  Payment,
  LocalShipping,
  CheckCircle,
} from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { ordersAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { TOAST_IDS } from '../../constants/toastIds';

function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cash',
    notes: '',
  });

  // Auto-fill user details from logged-in profile
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  const deliveryFee = total > 5000 ? 0 : 200;
  const finalTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">
          Your cart is empty. Please add items before checking out.
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Go to Products
        </Button>
      </Container>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Only allow numbers for postal code
    if (name === 'postalCode') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue,
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare order data to match backend Order model
      const orderData = {
        deliveryAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        deliveryPhone: formData.phone,
        paymentMethod: formData.paymentMethod,
        deliveryNotes: formData.notes,
        items: items.map(item => ({
          product: { id: item.id },
          quantity: item.quantity,
          price: item.price,
        })),
      };

      console.log('📦 Submitting order:', orderData);
      console.log('🛒 Cart items:', items);
      
      const response = await ordersAPI.createOrder(orderData);
      console.log('✅ Order created successfully:', response.data);
      
      toast.success('🎉 Order placed successfully! Thank you for shopping with us.', {
        toastId: TOAST_IDS.ORDER_SUCCESS,
      });
      clearCart({ showToast: false });
      
      // Navigate to orders page with success message
      navigate('/orders', { 
        replace: true,
        state: { newOrder: true }
      });
    } catch (error) {
      console.error('❌ Error creating order:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error data:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      const errorMessage = error.response?.data?.message || error.response?.data || 'Failed to place order. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Left Column - Forms */}
          <Grid item xs={12} md={8}>
            {/* Contact Information - Auto-filled from profile */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Contact Information
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Auto-filled from your profile
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                    disabled
                    helperText="From your profile"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                    disabled
                    helperText="From your profile"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    InputProps={{
                      readOnly: true,
                    }}
                    disabled
                    helperText="From your profile"
                  />
                </Grid>
              </Grid>
              {(!formData.fullName || !formData.email || !formData.phone) && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Please update your profile with your contact information before checking out.
                  <Button
                    size="small"
                    onClick={() => navigate('/profile')}
                    sx={{ ml: 2 }}
                  >
                    Go to Profile
                  </Button>
                </Alert>
              )}
            </Paper>

            {/* Delivery Address */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Delivery Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Street Address"
                    name="address"
                    multiline
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                    }}
                    helperText="Numbers only"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Payment Method */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  bgcolor: 'primary.light',
                  borderRadius: 2,
                  color: 'primary.dark',
                }}
              >
                <Payment sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    💵 Cash on Delivery
                  </Typography>
                  <Typography variant="body2">
                    Pay with cash when your order arrives at your doorstep
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Order Notes */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Notes (Optional)
              </Typography>
              <TextField
                fullWidth
                label="Special instructions for delivery"
                name="notes"
                multiline
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="e.g., Call before delivery, Leave at door, etc."
              />
            </Paper>
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />

              {/* Items List */}
              <Box sx={{ mb: 2 }}>
                {items.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">
                      {item.name} x {item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Totals */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal:</Typography>
                  <Typography variant="body2">Rs. {total.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Delivery Fee:</Typography>
                  <Typography variant="body2">
                    Rs. {deliveryFee.toFixed(2)}
                  </Typography>
                </Box>
                {total > 5000 && (
                  <Alert severity="success" sx={{ mb: 2, py: 0 }}>
                    Free delivery!
                  </Alert>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  Rs. {finalTotal.toFixed(2)}
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
                sx={{ mb: 2 }}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/cart')}
                disabled={loading}
              >
                Back to Cart
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Checkout;










