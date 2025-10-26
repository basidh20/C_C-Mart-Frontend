import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Collapse,
  Alert,
  CircularProgress,
  AlertTitle,
} from '@mui/material';
import {
  Visibility,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LocalShipping,
  CheckCircle,
  Cancel,
  Pending,
  Refresh,
} from '@mui/icons-material';
import { ordersAPI } from '../../services/api';
import { formatCurrency, formatDate, getStatusColor } from '../../theme/sharedStyles';
import { toast } from 'react-toastify';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    dispatched: 0,
    delivered: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [orders]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      console.log('Fetching orders from backend...');
      const response = await ordersAPI.getAllOrders();
      console.log('Orders response:', response.data);
      setOrders(response.data || []);
      toast.success(`Loaded ${response.data?.length || 0} orders`);
    } catch (error) {
      console.error('Error fetching orders:', error);
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to fetch orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'PENDING').length,
      approved: orders.filter(o => o.status === 'APPROVED').length,
      dispatched: orders.filter(o => o.status === 'DISPATCHED').length,
      delivered: orders.filter(o => o.status === 'DELIVERED').length,
      cancelled: orders.filter(o => o.status === 'CANCELLED').length,
    };
    setStats(stats);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      console.log(`Updating order ${orderId} status to ${newStatus}`);
      await ordersAPI.updateOrderStatus(orderId, { status: newStatus });
      toast.success('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to update order status');
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailsDialogOpen(true);
  };

  const handleRowExpand = (orderId) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'ALL' || order.status === filterStatus;
    const matchesSearch = 
      order.id.toString().includes(searchTerm) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <Pending />;
      case 'APPROVED': return <CheckCircle />;
      case 'DISPATCHED': return <LocalShipping />;
      case 'DELIVERED': return <CheckCircle />;
      case 'CANCELLED': return <Cancel />;
      default: return <Pending />;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            📦 Order Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track all customer orders
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={fetchOrders}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      {/* Debug/Status Info */}
      {orders.length === 0 && !loading && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <AlertTitle>No Orders Found</AlertTitle>
          There are currently no orders in the system. 
          {' '}Make sure you're logged in as an admin and the backend is connected properly.
          <br />
          <strong>Backend URL:</strong> {process.env.REACT_APP_API_URL || 'https://c-c-mart-backend-production.up.railway.app/api'}
        </Alert>
      )}

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.total}</Typography>
              <Typography variant="body2">Total Orders</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.pending}</Typography>
              <Typography variant="body2">Pending</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.approved}</Typography>
              <Typography variant="body2">Approved</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'secondary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.dispatched}</Typography>
              <Typography variant="body2">Dispatched</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.delivered}</Typography>
              <Typography variant="body2">Delivered</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'error.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.cancelled}</Typography>
              <Typography variant="body2">Cancelled</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Orders"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Order ID, Customer Name, or Email"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Filter by Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="ALL">All Orders</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="DISPATCHED">Dispatched</MenuItem>
              <MenuItem value="DELIVERED">Delivered</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.100' }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Items</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body1" color="text.secondary" sx={{ py: 4 }}>
                    No orders found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <TableRow hover>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleRowExpand(order.id)}>
                        {expandedRow === order.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </TableCell>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {order.user?.name || 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {order.user?.email || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                    <TableCell>{order.orderItems?.length || 0}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(order.status)}
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Visibility />}
                          onClick={() => handleViewDetails(order)}
                        >
                          View
                        </Button>
                        <TextField
                          select
                          size="small"
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          sx={{ minWidth: 130 }}
                        >
                          <MenuItem value="PENDING">Pending</MenuItem>
                          <MenuItem value="APPROVED">Approved</MenuItem>
                          <MenuItem value="DISPATCHED">Dispatched</MenuItem>
                          <MenuItem value="DELIVERED">Delivered</MenuItem>
                          <MenuItem value="CANCELLED">Cancelled</MenuItem>
                        </TextField>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                      <Collapse in={expandedRow === order.id} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            Order Details
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                                  Delivery Information
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Address:</strong> {order.deliveryAddress || 'N/A'}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Phone:</strong> {order.user?.phone || 'N/A'}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Payment Method:</strong> {order.paymentMethod || 'N/A'}
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                                  Order Items
                                </Typography>
                                {order.orderItems?.map((item, index) => (
                                  <Typography key={index} variant="body2">
                                    {item.product?.name || 'Product'} x {item.quantity} - {formatCurrency(item.price * item.quantity)}
                                  </Typography>
                                ))}
                              </Paper>
                            </Grid>
                          </Grid>
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

      {/* Order Details Dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Order Details - #{selectedOrder?.id}
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Customer Information
                </Typography>
                <Typography variant="body2"><strong>Name:</strong> {selectedOrder.user?.name}</Typography>
                <Typography variant="body2"><strong>Email:</strong> {selectedOrder.user?.email}</Typography>
                <Typography variant="body2"><strong>Phone:</strong> {selectedOrder.user?.phone}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Order Information
                </Typography>
                <Typography variant="body2"><strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}</Typography>
                <Typography variant="body2"><strong>Status:</strong> {selectedOrder.status}</Typography>
                <Typography variant="body2"><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Delivery Address
                </Typography>
                <Typography variant="body2">{selectedOrder.deliveryAddress}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                  Order Items
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.orderItems?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.product?.name || 'Product'}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                          <TableCell align="right">{formatCurrency(item.price * item.quantity)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} align="right" sx={{ fontWeight: 700 }}>Total:</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>
                          {formatCurrency(selectedOrder.totalAmount)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminOrders;










