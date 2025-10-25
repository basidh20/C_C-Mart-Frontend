import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  ArrowBack,
  LocalShipping,
  CheckCircle,
  Cancel,
  HourglassEmpty,
  Phone,
  DirectionsCar,
  Person,
} from '@mui/icons-material';
import { ordersAPI } from '../../services/api';
import { toast } from 'react-toastify';

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getOrder(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      await ordersAPI.cancelOrder(id);
      toast.success('Order cancelled successfully');
      fetchOrderDetails();
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <HourglassEmpty />;
      case 'approved':
      case 'assigned':
      case 'in_delivery':
        return <LocalShipping />;
      case 'delivered':
        return <CheckCircle />;
      case 'cancelled':
        return <Cancel />;
      default:
        return <HourglassEmpty />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'info';
      case 'assigned':
      case 'in_delivery':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'assigned':
        return 'Assigned';
      case 'in_delivery':
        return 'In Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status || 'Pending';
    }
  };

  const getOrderSteps = () => {
    const steps = ['Order Placed', 'Processing', 'Out for Delivery', 'Delivered'];
    const status = order?.status?.toLowerCase();
    
    let activeStep = 0;
    if (status === 'pending') activeStep = 0;
    else if (status === 'approved') activeStep = 1;
    else if (status === 'assigned' || status === 'in_delivery') activeStep = 2;
    else if (status === 'delivered') activeStep = 3;
    else if (status === 'cancelled') activeStep = -1;
    
    return { steps, activeStep };
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Order not found'}
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/orders')}
        >
          Back to Orders
        </Button>
      </Container>
    );
  }

  const { steps, activeStep } = getOrderSteps();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/orders')}
        sx={{ mb: 3 }}
      >
        Back to Orders
      </Button>

      <Grid container spacing={3}>
        {/* Order Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">
                Order #{order.id}
              </Typography>
              <Chip
                icon={getStatusIcon(order.status)}
                label={getStatusLabel(order.status)}
                color={getStatusColor(order.status)}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Placed on {new Date(order.createdAt || order.orderDate).toLocaleString()}
            </Typography>
          </Paper>
        </Grid>

        {/* Order Tracking */}
        {order.status?.toLowerCase() !== 'cancelled' && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Tracking
              </Typography>
              <Stepper activeStep={activeStep} sx={{ mt: 3 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>
        )}

        {/* Order Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(order.items || order.orderItems)?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Typography variant="body2">
                          {item.product?.name || 'Product'}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="right">
                        Rs. {Number(item.price).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        Rs. {(Number(item.price) * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {!(order.items || order.orderItems)?.length && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Typography color="text.secondary">No items found</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Order Summary & Details */}
        <Grid item xs={12} md={4}>
          {/* Order Summary */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Subtotal:</Typography>
              <Typography variant="body2">
                Rs. {Number(order.totalAmount || 0).toFixed(2)}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                Rs. {Number(order.totalAmount || 0).toFixed(2)}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Payment Method: {order.paymentMethod || 'Cash on Delivery'}
            </Typography>
          </Paper>

          {/* Delivery Address */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Delivery Address
            </Typography>
            <Typography variant="body2">
              {order.deliveryAddress || 'N/A'}
            </Typography>
          </Paper>

          {/* Delivery Agent Info */}
          {order.deliveryAgent && (order.status === 'assigned' || order.status === 'in_delivery' || order.status === 'delivered') && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalShipping color="primary" />
                Delivery Agent
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Person fontSize="small" color="action" />
                  <Typography variant="body2" fontWeight="bold">
                    {order.deliveryAgent.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Phone fontSize="small" color="action" />
                  <Typography variant="body2">
                    {order.deliveryAgent.phone}
                  </Typography>
                </Box>
                {order.deliveryAgent.vehicleType && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DirectionsCar fontSize="small" color="action" />
                    <Typography variant="body2">
                      {order.deliveryAgent.vehicleType} - {order.deliveryAgent.vehicleNumber}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Chip
                label={order.status === 'delivered' ? 'Delivered' : 'On the way'}
                color={order.status === 'delivered' ? 'success' : 'info'}
                size="small"
                sx={{ mt: 1 }}
              />
            </Paper>
          )}

          {/* Delivery Notes */}
          {order.deliveryNotes && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Delivery Notes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.deliveryNotes}
              </Typography>
            </Paper>
          )}

          {/* Cancel Order Button */}
          {order.status?.toLowerCase() === 'pending' && (
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={handleCancelOrder}
              startIcon={<Cancel />}
            >
              Cancel Order
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default OrderDetails;










