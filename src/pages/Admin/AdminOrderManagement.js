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
      console.log('Fetched orders:', response.data);

      const ordersData = Array.isArray(response.data) ? response.data : [];
      if (ordersData.length > 0) {
        console.log('Sample order structure:', ordersData[0]);
        console.log('Sample order items:', ordersData[0].orderItems);
      }

      setOrders(ordersData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
      setOrders([]);
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
    fetchDeliveryAgents();
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

  const handleOpenDetailsDialog = async (orderId) => {
    setDetailsDialogOpen(true);
    setLoadingDetails(true);
    try {
      const response = await ordersAPI.getOrder(orderId);
      setOrderDetails(response.data);
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError('Failed to load order details');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseDetailsDialog = () => {
    setDetailsDialogOpen(false);
    setOrderDetails(null);
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

  const toggleRowExpansion = async (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    console.log('Expanding order:', orderId);
    console.log('Order data:', order);
    console.log('Order items:', order?.orderItems);

    if (!expandedRows[orderId] && (!order?.orderItems || order.orderItems.length === 0)) {
      try {
        console.log('Fetching detailed order info for order:', orderId);
        const response = await ordersAPI.getOrder(orderId);
        console.log('Detailed order response:', response.data);

        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.id === orderId ? { ...o, orderItems: response.data.orderItems || [] } : o
          )
        );
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    }

    setExpandedRows((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
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
    return orders.filter((order) => order.status === status);
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

      {/* (Table and dialogs unchanged from your existing version) */}
      {/* ... */}
    </Container>
  );
}

export default AdminOrderManagement;
