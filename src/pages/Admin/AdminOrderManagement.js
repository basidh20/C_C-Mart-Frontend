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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Alert,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  LocalShipping,
  Pending,
  AssignmentInd,
  Visibility,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import api, { ordersAPI } from '../../services/api';

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
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    fetchOrders();
    fetchDeliveryAgents();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAllOrders();
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveryAgents = async () => {
    try {
      const response = await api.get('/delivery-agents/available');
      setDeliveryAgents(response.data);
    } catch {
      setError('Failed to load delivery agents');
    }
  };

  const handleApproveOrder = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/approve`);
      setSuccess('Order approved successfully!');
      fetchOrders();
    } catch {
      setError('Failed to approve order');
    }
  };

  const handleOpenAssignDialog = (order) => {
    setSelectedOrder(order);
    setAssignDialogOpen(true);
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
    } catch {
      setError('Failed to assign agent');
    }
  };

  const handleOpenDetailsDialog = async (orderId) => {
    setDetailsDialogOpen(true);
    setLoadingDetails(true);
    try {
      const response = await ordersAPI.getOrder(orderId);
      setOrderDetails(response.data);
    } catch {
      setError('Failed to load order details');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false);
    setOrderDetails(null);
  };

  const toggleRowExpansion = async (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (!expandedRows[orderId] && (!order?.orderItems || order.orderItems.length === 0)) {
      try {
        const response = await ordersAPI.getOrder(orderId);
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, orderItems: response.data.orderItems } : o))
        );
      } catch {
        setError('Failed to fetch order items');
      }
    }
    setExpandedRows((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const tabContent = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Assigned', value: 'assigned' },
    { label: 'In Delivery', value: 'in_delivery' },
    { label: 'All Orders', value: 'all' },
  ];

  const filterOrdersByStatus = (status) => {
    if (status === 'all') return orders;
    return orders.filter((o) => o.status === status);
  };

  const displayOrders = filterOrdersByStatus(tabContent[currentTab].value);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(amount);

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

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', py: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
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

      <Tabs
        value={currentTab}
        onChange={(e, v) => setCurrentTab(v)}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        {tabContent.map((t) => (
          <Tab key={t.value} label={t.label} />
        ))}
      </Tabs>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              displayOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton onClick={() => toggleRowExpansion(order.id)} size="small">
                        {expandedRows[order.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customerName || 'N/A'}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell>
                      <Chip label={order.status} color={getStatusColor(order.status)} />
                    </TableCell>
                    <TableCell align="right">
                      {order.status === 'pending' && (
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleApproveOrder(order.id)}
                          sx={{ mr: 1 }}
                        >
                          Approve
                        </Button>
                      )}
                      {order.status === 'approved' && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenAssignDialog(order)}
                          sx={{ mr: 1 }}
                        >
                          Assign
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        startIcon={<Visibility />}
                        onClick={() => handleOpenDetailsDialog(order.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Expandable Row */}
                  <TableRow>
                    <TableCell colSpan={7} sx={{ p: 0 }}>
                      <Collapse in={expandedRows[order.id]} timeout="auto" unmountOnExit>
                        <Box m={2}>
                          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Order Items
                          </Typography>
                          <Divider sx={{ mb: 1 }} />
                          {order.orderItems && order.orderItems.length > 0 ? (
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Product</TableCell>
                                  <TableCell>Quantity</TableCell>
                                  <TableCell>Price</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {order.orderItems.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell>{item.productName}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{formatCurrency(item.price)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              No items found.
                            </Typography>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Assign Agent Dialog */}
      <Dialog open={assignDialogOpen} onClose={handleCloseAssignDialog} fullWidth maxWidth="sm">
        <DialogTitle>Assign Delivery Agent</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Agent</InputLabel>
            <Select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              label="Select Agent"
            >
              {deliveryAgents.map((agent) => (
                <MenuItem key={agent.id} value={agent.id}>
                  {agent.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAssignDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleAssignAgent}>
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={detailsDialogOpen} onClose={handleCloseDetailsDialog} fullWidth maxWidth="sm">
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {loadingDetails ? (
            <CircularProgress />
          ) : orderDetails ? (
            <Box>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Customer:</strong> {orderDetails.customerName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Date:</strong> {new Date(orderDetails.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Total:</strong> {formatCurrency(orderDetails.totalAmount)}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Items
              </Typography>
              {orderDetails.orderItems?.length > 0 ? (
                orderDetails.orderItems.map((item) => (
                  <Typography key={item.id} variant="body2">
                    {item.productName} × {item.quantity} — {formatCurrency(item.price)}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No items found.
                </Typography>
              )}
            </Box>
          ) : (
            <Typography>No details available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminOrderManagement;
