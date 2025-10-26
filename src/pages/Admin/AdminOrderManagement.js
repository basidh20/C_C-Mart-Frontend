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
  Collapse,
  IconButton,
} from '@mui/material';
import {
  CheckCircle,
  LocalShipping,
  Pending,
  AssignmentInd,
  Visibility,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Phone,
  Email,
  Home,
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
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    fetchOrders();
    fetchDeliveryAgents();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAllOrders();
      // Ensure response.data is an array
      const ordersData = Array.isArray(response.data) ? response.data : [];
      console.log('Sample order user data:', ordersData[0]?.user);
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

  const toggleRowExpansion = (orderId) => {
    setExpandedRows(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
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
              <TableCell />
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Customer</strong></TableCell>
              <TableCell><strong>Total (incl. Delivery)</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Delivery Agent</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayOrders.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => toggleRowExpansion(order.id)}
                    >
                      {expandedRows[order.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
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
                  <TableCell>{formatCurrency((order.totalAmount || 0) + 200)}</TableCell>
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
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={expandedRows[order.id]} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <Grid container spacing={3}>
                          {/* Customer Contact Information */}
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Email color="primary" /> Customer Contact Information
                              </Typography>
                              <Divider sx={{ mb: 2 }} />
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography variant="body2" color="textSecondary" sx={{ minWidth: 80 }}>
                                    Name:
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {order.user?.displayName || order.user?.name || 'N/A'}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Email fontSize="small" color="action" />
                                  <Typography variant="body2" color="textSecondary" sx={{ minWidth: 80 }}>
                                    Email:
                                  </Typography>
                                  <Typography variant="body1">
                                    {order.user?.email || 'N/A'}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Phone fontSize="small" color="action" />
                                  <Typography variant="body2" color="textSecondary" sx={{ minWidth: 80 }}>
                                    Phone:
                                  </Typography>
                                  <Typography variant="body1">
                                    {order.user?.phone || order.user?.phoneNumber || order.user?.contactNumber || order.phoneNumber || 'N/A'}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Home fontSize="small" color="action" />
                                  <Typography variant="body2" color="textSecondary" sx={{ minWidth: 80 }}>
                                    Address:
                                  </Typography>
                                  <Typography variant="body1">
                                    {order.deliveryAddress || order.user?.address || 'N/A'}
                                  </Typography>
                                </Box>
                              </Box>
                            </Paper>
                          </Grid>

                          {/* Order Items */}
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                              <Typography variant="h6" gutterBottom>
                                Order Items ({order.orderItems?.length || 0} items)
                              </Typography>
                              <Divider sx={{ mb: 2 }} />
                              {order.orderItems && Array.isArray(order.orderItems) && order.orderItems.length > 0 ? (
                                <TableContainer>
                                  <Table size="small">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell><strong>Product</strong></TableCell>
                                        <TableCell align="right"><strong>Qty</strong></TableCell>
                                        <TableCell align="right"><strong>Price</strong></TableCell>
                                        <TableCell align="right"><strong>Subtotal</strong></TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {order.orderItems.map((item, idx) => (
                                        <TableRow key={idx}>
                                          <TableCell>{item.product?.name || item.productName || 'Product'}</TableCell>
                                          <TableCell align="right">{item.quantity || 0}</TableCell>
                                          <TableCell align="right">{formatCurrency(item.price || 0)}</TableCell>
                                          <TableCell align="right">{formatCurrency((item.price || 0) * (item.quantity || 0))}</TableCell>
                                        </TableRow>
                                      ))}
                                      <TableRow>
                                        <TableCell colSpan={3} align="right"><strong>Subtotal:</strong></TableCell>
                                        <TableCell align="right"><strong>{formatCurrency(order.totalAmount || 0)}</strong></TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell colSpan={3} align="right"><strong>Delivery Fee:</strong></TableCell>
                                        <TableCell align="right"><strong>{formatCurrency(200)}</strong></TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell colSpan={3} align="right">
                                          <Typography variant="h6">Total:</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                          <Typography variant="h6" color="primary">
                                            {formatCurrency((order.totalAmount || 0) + 200)}
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              ) : (
                                <Box sx={{ py: 2, textAlign: 'center' }}>
                                  <Typography variant="body2" color="text.secondary">
                                    No items found for this order
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    Order ID: {order.id} | Total: {formatCurrency((order.totalAmount || 0) + 200)}
                                  </Typography>
                                </Box>
                              )}
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
            {displayOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
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
