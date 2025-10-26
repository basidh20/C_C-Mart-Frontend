import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  CheckCircle,
  LocalShipping,
  Pending,
  AssignmentInd,
  Visibility,
} from '@mui/icons-material';
import api, { ordersAPI } from '../../services/api';
import { sharedStyles, formatCurrency, formatDateTime, getStatusColor, getStatusLabel } from '../../theme/sharedStyles';

function AdminOrderManagement() {
  const [orders, setOrders] = useState([]);
  const [deliveryAgents, setDeliveryAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchDeliveryAgents();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAllOrders();
      // Ensure response.data is an array
      const ordersData = Array.isArray(response.data) ? response.data : [];
      setOrders(ordersData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
      setOrders([]); // Set empty array on error
      setLoading(false);
    }
  };

  const fetchDeliveryAgents = async () => {
    try {
      const response = await api.get('/delivery-agents/available');
      setDeliveryAgents(response.data);
    } catch (err) {
      console.error('Error fetching delivery agents:', err);
    }
  };

  const handleApproveOrder = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/approve`);
      setSuccess('Order approved successfully!');
      fetchOrders();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error approving order:', err);
      setError(err.response?.data || 'Failed to approve order');
    }
  };

  const handleOpenAssignDialog = (order) => {
    setSelectedOrder(order);
    setSelectedAgent('');
    setAssignDialogOpen(true);
    fetchDeliveryAgents(); // Refresh available agents
  };

  const handleCloseAssignDialog = () => {
    setAssignDialogOpen(false);
    setSelectedOrder(null);
    setSelectedAgent('');
  };

  const handleAssignAgent = async () => {
    if (!selectedAgent) {
      setError('Please select a delivery agent');
      return;
    }

    try {
      await api.put(`/orders/${selectedOrder.id}/assign`, { agentId: selectedAgent });
      setSuccess('Delivery agent assigned successfully!');
      handleCloseAssignDialog();
      fetchOrders();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error assigning delivery agent:', err);
      setError(err.response?.data || 'Failed to assign delivery agent');
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setSuccess('Order status updated successfully!');
      fetchOrders();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating order status:', err);
      setError(err.response?.data || 'Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      approved: 'info',
      assigned: 'primary',
      in_delivery: 'secondary',
      delivered: 'success',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Pending />,
      approved: <CheckCircle />,
      assigned: <AssignmentInd />,
      in_delivery: <LocalShipping />,
      delivered: <CheckCircle />,
    };
    return icons[status] || null;
  };

  const filterOrdersByStatus = (status) => {
    if (!Array.isArray(orders)) return [];
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  const tabContent = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Assigned', value: 'assigned' },
    { label: 'In Delivery', value: 'in_delivery' },
    { label: 'All Orders', value: 'all' },
  ];

  const displayOrders = filterOrdersByStatus(tabContent[currentTab].value);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
        Order Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4" color="warning.main">
                {Array.isArray(orders) ? orders.filter(o => o.status === 'pending').length : 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Approved
              </Typography>
              <Typography variant="h4" color="info.main">
                {Array.isArray(orders) ? orders.filter(o => o.status === 'approved').length : 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                In Delivery
              </Typography>
              <Typography variant="h4" color="secondary.main">
                {Array.isArray(orders) ? orders.filter(o => o.status === 'in_delivery').length : 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h4">
                {Array.isArray(orders) ? orders.length : 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
          {tabContent.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Paper>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Customer</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Delivery Agent</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: order.user?.isDeleted ? 'error.main' : 
                             !order.user?.isActive ? 'warning.main' : 'text.primary',
                      fontStyle: (order.user?.isDeleted || !order.user?.isActive) ? 'italic' : 'normal'
                    }}
                  >
                    {order.user?.displayName || order.user?.name || 'N/A'}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="textSecondary"
                    sx={{ 
                      color: order.user?.isDeleted ? 'error.light' : 'textSecondary'
                    }}
                  >
                    {order.user?.email || 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status.replace('_', ' ').toUpperCase()}
                    color={getStatusColor(order.status)}
                    size="small"
                    icon={getStatusIcon(order.status)}
                  />
                </TableCell>
                <TableCell>
                  {order.deliveryAgent ? (
                    <Box>
                      <Typography variant="body2">{order.deliveryAgent.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {order.deliveryAgent.phone}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      Not assigned
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    {order.status === 'pending' && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<CheckCircle />}
                        onClick={() => handleApproveOrder(order.id)}
                      >
                        Approve
                      </Button>
                    )}
                    {order.status === 'approved' && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<AssignmentInd />}
                        onClick={() => handleOpenAssignDialog(order)}
                      >
                        Assign Agent
                      </Button>
                    )}
                    {order.status === 'assigned' && (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<LocalShipping />}
                        onClick={() => handleUpdateStatus(order.id, 'in_delivery')}
                      >
                        Start Delivery
                      </Button>
                    )}
                    {order.status === 'in_delivery' && (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<CheckCircle />}
                        onClick={() => handleUpdateStatus(order.id, 'delivered')}
                      >
                        Mark Delivered
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {displayOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="textSecondary" sx={{ py: 3 }}>
                    No orders found in this category
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Assign Agent Dialog */}
      <Dialog open={assignDialogOpen} onClose={handleCloseAssignDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Assign Delivery Agent</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Order #{selectedOrder.id}
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  color: selectedOrder.user?.isDeleted ? 'error.main' : 
                         !selectedOrder.user?.isActive ? 'warning.main' : 'text.primary',
                  fontStyle: (selectedOrder.user?.isDeleted || !selectedOrder.user?.isActive) ? 'italic' : 'normal'
                }}
              >
                Customer: {selectedOrder.user?.displayName || selectedOrder.user?.name || 'N/A'}
              </Typography>
              <Typography variant="body2">
                Total: {formatCurrency(selectedOrder.totalAmount)}
              </Typography>
            </Box>
          )}
          <Divider sx={{ mb: 3 }} />
          <FormControl fullWidth>
            <InputLabel>Select Delivery Agent</InputLabel>
            <Select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              label="Select Delivery Agent"
            >
              {deliveryAgents.map((agent) => (
                <MenuItem key={agent.id} value={agent.id}>
                  <Box>
                    <Typography variant="body2">{agent.name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {agent.phone} - {agent.vehicleType} ({agent.vehicleNumber})
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {deliveryAgents.length === 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              No available delivery agents. Please add or activate delivery agents first.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAssignAgent}
            disabled={!selectedAgent}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminOrderManagement;
