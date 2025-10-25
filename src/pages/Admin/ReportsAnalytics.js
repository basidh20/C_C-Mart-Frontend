import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  ShoppingCart,
  People,
  Inventory,
  LocalShipping,
  Star,
} from '@mui/icons-material';
import { productsAPI, ordersAPI, usersAPI } from '../../services/api';

function ReportsAnalytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    averageOrderValue: 0,
    topProducts: [],
    recentOrders: [],
    orderStatusDistribution: {},
    monthlyRevenue: [],
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch all data
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        productsAPI.getProducts(),
        ordersAPI.getAllOrders(), // Use getAllOrders for admin
        usersAPI.getUsers(),
      ]);

      const products = Array.isArray(productsRes.data) ? productsRes.data : [];
      const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
      const users = Array.isArray(usersRes.data) ? usersRes.data : [];

      console.log('📊 Analytics Data:', { products: products.length, orders: orders.length, users: users.length });

      // Calculate analytics
      const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount || 0), 0);
      const totalOrders = orders.length;
      const totalUsers = users.filter(u => u.role === 'customer').length; // Only count customers
      const totalProducts = products.filter(p => p.isActive).length;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Calculate top products from actual order items
      const productSalesMap = {};
      orders.forEach(order => {
        (order.items || []).forEach(item => {
          const productId = item.product?.id;
          if (productId) {
            if (!productSalesMap[productId]) {
              productSalesMap[productId] = {
                product: item.product,
                quantity: 0,
                revenue: 0,
              };
            }
            productSalesMap[productId].quantity += item.quantity;
            productSalesMap[productId].revenue += parseFloat(item.price) * item.quantity;
          }
        });
      });

      const topProducts = Object.values(productSalesMap)
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5)
        .map(item => ({
          ...item.product,
          sales: item.quantity,
          revenue: item.revenue,
        }));

      // Recent orders
      const recentOrders = orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      // Order status distribution
      const orderStatusDistribution = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});

      // Calculate monthly revenue from actual orders
      const monthlyRevenueMap = {};
      orders.forEach(order => {
        const date = new Date(order.createdAt);
        const monthKey = date.toLocaleString('default', { month: 'short' });
        if (!monthlyRevenueMap[monthKey]) {
          monthlyRevenueMap[monthKey] = 0;
        }
        monthlyRevenueMap[monthKey] += parseFloat(order.totalAmount || 0);
      });

      const monthlyRevenue = Object.entries(monthlyRevenueMap).map(([month, revenue]) => ({
        month,
        revenue,
      }));

      setAnalytics({
        totalRevenue,
        totalOrders,
        totalUsers,
        totalProducts,
        averageOrderValue,
        topProducts,
        recentOrders,
        orderStatusDistribution,
        monthlyRevenue,
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'warning';
      case 'approved': return 'info';
      case 'assigned': return 'primary';
      case 'in_delivery': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const formatCurrency = (amount) => {
    return `Rs. ${Number(amount).toFixed(2)}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, p: 3, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            📊 Reports & Analytics
          </Typography>
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              bgcolor: 'success.main', 
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' }
            }}>
              <CardContent>
                <Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="overline" sx={{ opacity: 0.9, fontWeight: 600 }}>
                      Total Revenue
                    </Typography>
                    <AttachMoney />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {formatCurrency(analytics.totalRevenue)}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <TrendingUp fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      +12.5% from last month
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' }
            }}>
              <CardContent>
                <Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="overline" sx={{ opacity: 0.9, fontWeight: 600 }}>
                      Total Orders
                    </Typography>
                    <ShoppingCart />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {analytics.totalOrders}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <TrendingUp fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      +8.2% from last month
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              bgcolor: 'info.main', 
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' }
            }}>
              <CardContent>
                <Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="overline" sx={{ opacity: 0.9, fontWeight: 600 }}>
                      Total Customers
                    </Typography>
                    <People />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {analytics.totalUsers}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <TrendingUp fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      +15.3% from last month
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              bgcolor: 'warning.main', 
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' }
            }}>
              <CardContent>
                <Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="overline" sx={{ opacity: 0.9, fontWeight: 600 }}>
                      Avg Order Value
                    </Typography>
                    <Inventory />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {formatCurrency(analytics.averageOrderValue)}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <TrendingDown fontSize="small" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      -2.1% from last month
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts and Tables */}
        <Grid container spacing={3}>
          {/* Top Products */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                🏆 Top Selling Products
              </Typography>
              {analytics.topProducts.length === 0 ? (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No product sales data available yet
                  </Typography>
                </Box>
              ) : (
              <List>
                {analytics.topProducts.map((product, index) => (
                  <React.Fragment key={product.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          src={product.imageUrl}
                          alt={product.name}
                          sx={{ bgcolor: 'grey.300' }}
                        >
                          <Inventory />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.name}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {product.category?.name || 'Uncategorized'} • {formatCurrency(product.price)}
                            </Typography>
                            <Box display="flex" alignItems="center" mt={0.5}>
                              <Star color="warning" fontSize="small" />
                              <Typography variant="body2" sx={{ ml: 0.5 }}>
                                {product.sales} units sold
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < analytics.topProducts.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              )}
            </Paper>
          </Grid>

          {/* Order Status Distribution */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                📦 Order Status Distribution
              </Typography>
              {Object.keys(analytics.orderStatusDistribution).length === 0 ? (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No orders yet
                  </Typography>
                </Box>
              ) : (
              <Box sx={{ mt: 2 }}>
                {Object.entries(analytics.orderStatusDistribution).map(([status, count]) => (
                  <Box key={status} sx={{ mb: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box display="flex" alignItems="center">
                        <Chip
                          label={status}
                          color={getStatusColor(status)}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2">
                          {count} orders
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {((count / analytics.totalOrders) * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              )}
            </Paper>
          </Grid>

          {/* Recent Orders */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                🛒 Recent Orders
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order #</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analytics.recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>{order.user?.name || 'N/A'}</TableCell>
                        <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    {analytics.recentOrders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <Typography variant="body2" color="text.secondary">
                            No orders yet
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Monthly Revenue */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                📈 Monthly Revenue Trend
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell>Revenue</TableCell>
                      <TableCell>Growth</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analytics.monthlyRevenue.map((month, index) => (
                      <TableRow key={month.month}>
                        <TableCell>{month.month}</TableCell>
                        <TableCell>{formatCurrency(month.revenue)}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            {index > 0 && month.revenue > analytics.monthlyRevenue[index - 1].revenue ? (
                              <>
                                <TrendingUp color="success" fontSize="small" />
                                <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
                                  +{(((month.revenue - analytics.monthlyRevenue[index - 1].revenue) / analytics.monthlyRevenue[index - 1].revenue) * 100).toFixed(1)}%
                                </Typography>
                              </>
                            ) : index > 0 ? (
                              <>
                                <TrendingDown color="error" fontSize="small" />
                                <Typography variant="body2" color="error.main" sx={{ ml: 0.5 }}>
                                  -{(((analytics.monthlyRevenue[index - 1].revenue - month.revenue) / analytics.monthlyRevenue[index - 1].revenue) * 100).toFixed(1)}%
                                </Typography>
                              </>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                -
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                    {analytics.monthlyRevenue.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          <Typography variant="body2" color="text.secondary">
                            No revenue data available
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ReportsAnalytics;










