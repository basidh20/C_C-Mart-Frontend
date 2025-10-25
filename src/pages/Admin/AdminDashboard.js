import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  ShoppingCart,
  People,
  Inventory,
  TrendingUp,
  AttachMoney,
  LocalShipping,
  Add,
  Visibility,
  Edit,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productsAPI, ordersAPI, usersAPI, categoriesAPI } from '../../services/api';
import { sharedStyles, formatCurrency, formatDate, getStatusColor } from '../../theme/sharedStyles';

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Add product modal state
  const [addOpen, setAddOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    category_id: '',
    image_url: '',
    stock_quantity: 0,
    unit: 'piece',
    is_featured: false,
  });
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchDashboardData();
    loadCategories();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const productsResponse = await productsAPI.getProducts();
      const products = Array.isArray(productsResponse.data) ? productsResponse.data : [];
      
      // Fetch orders - use getAllOrders for admin
      const ordersResponse = await ordersAPI.getAllOrders();
      const orders = Array.isArray(ordersResponse.data) ? ordersResponse.data : [];
      
      // Fetch users
      const usersResponse = await usersAPI.getUsers();
      const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];
      
      console.log('📊 Dashboard Data:', { 
        products: products.length, 
        orders: orders.length, 
        users: users.length 
      });
      
      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount || 0), 0);
      const activeProducts = products.filter(p => p.isActive);
      const customers = users.filter(u => u.role === 'customer');
      
      setStats({
        totalProducts: activeProducts.length,
        totalOrders: orders.length,
        totalUsers: customers.length,
        totalRevenue: totalRevenue,
      });
      
      // Get recent orders (last 5, sorted by date)
      const sortedOrders = [...orders].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentOrders(sortedOrders.slice(0, 5));
      
      // Get recent products (last 5, sorted by date)
      const sortedProducts = [...products].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentProducts(sortedProducts.slice(0, 5));
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      console.log('Loading categories...');
      const response = await categoriesAPI.getCategories({ limit: 1000 });
      console.log('Categories API response:', response);
      const list = Array.isArray(response.data)
        ? response.data
        : response.data?.data ?? [];
      console.log('Categories list:', list, 'Count:', list.length);
      setCategories(list);
    } catch (err) {
      console.error('Failed to load categories:', err);
      toast.error('Failed to load categories');
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      price: '',
      description: '',
      category_id: '',
      image_url: '',
      stock_quantity: 0,
      unit: 'piece',
      is_featured: false,
    });
    setFormError('');
  };

  const handleOpenAdd = () => {
    setFormError('');
    setAddOpen(true);
  };

  const handleCloseAdd = () => {
    setAddOpen(false);
    resetProductForm();
  };

  const handleCreateProduct = async () => {
    if (!productForm.name.trim() || productForm.price === '') {
      setFormError('Name and price are required');
      return;
    }

    try {
      setSubmitting(true);
      setFormError('');

      const payload = {
        name: productForm.name.trim(),
        price: parseFloat(productForm.price),
        description: productForm.description.trim(),
        imageUrl: productForm.image_url.trim() || null,
        stockQuantity: Number(productForm.stock_quantity ?? 0),
        unit: productForm.unit.trim() || 'piece',
        isFeatured: Boolean(productForm.is_featured),
        categoryId: productForm.category_id || null,
      };

      await productsAPI.createProduct(payload);
      toast.success('Product created successfully');
      setAddOpen(false);
      resetProductForm();
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to create product', err);
      const message = typeof err.response?.data === 'string'
        ? err.response.data
        : err.response?.data?.message || 'Failed to create product';
      setFormError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const getOrderStatusColor = (status) => {
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
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh',
          gap: 2,
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Loading dashboard...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)',
          }}
        >
          <Typography variant="h6" gutterBottom>Error Loading Dashboard</Typography>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header with Gradient */}
      <Paper 
        elevation={0} 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4,
          p: { xs: 3, sm: 4, md: 5 },
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(30%, -30%)',
          }
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            color: 'white', 
            fontWeight: 800,
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
            mb: 1,
            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          Welcome Back, Admin! 👋
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'rgba(255,255,255,0.95)', 
            fontWeight: 400,
            fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
          }}
        >
          Here's what's happening with your store today
        </Typography>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: 3,
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                borderColor: 'primary.dark',
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3 } }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    width: { xs: 50, sm: 56 }, 
                    height: { xs: 50, sm: 56 }, 
                    mr: 2,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  }}
                >
                  <Inventory fontSize="large" />
                </Avatar>
                <Box flex={1}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ 
                      textTransform: 'uppercase', 
                      fontWeight: 700, 
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }, 
                      display: 'block', 
                      mb: 0.5,
                      letterSpacing: 1,
                    }}
                  >
                    Total Products
                  </Typography>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 800, 
                      color: 'primary.main', 
                      fontSize: { xs: '2rem', sm: '2.5rem' }, 
                      lineHeight: 1,
                    }}
                  >
                    {stats.totalProducts}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ p: 0 }}>
              <Button 
                size="small" 
                fullWidth 
                onClick={() => navigate('/admin/products')} 
                sx={{ 
                  py: 1.5, 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                  }
                }}
              >
                <Visibility sx={{ mr: 1, fontSize: 18 }} />
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              border: '2px solid',
              borderColor: 'success.main',
              borderRadius: 3,
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                borderColor: 'success.dark',
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3 } }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'success.main', 
                    width: { xs: 50, sm: 56 }, 
                    height: { xs: 50, sm: 56 }, 
                    mr: 2,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  }}
                >
                  <ShoppingCart fontSize="large" />
                </Avatar>
                <Box flex={1}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ 
                      textTransform: 'uppercase', 
                      fontWeight: 700, 
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }, 
                      display: 'block', 
                      mb: 0.5,
                      letterSpacing: 1,
                    }}
                  >
                    Total Orders
                  </Typography>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 800, 
                      color: 'success.main', 
                      fontSize: { xs: '2rem', sm: '2.5rem' }, 
                      lineHeight: 1,
                    }}
                  >
                    {stats.totalOrders}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ p: 0 }}>
              <Button 
                size="small" 
                fullWidth 
                onClick={() => navigate('/admin/orders')} 
                sx={{ 
                  py: 1.5, 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  '&:hover': {
                    bgcolor: 'success.light',
                    color: 'success.dark',
                  }
                }}
              >
                <Visibility sx={{ mr: 1, fontSize: 18 }} />
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              border: '2px solid',
              borderColor: 'info.main',
              borderRadius: 3,
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                borderColor: 'info.dark',
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3 } }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'info.main', 
                    width: { xs: 50, sm: 56 }, 
                    height: { xs: 50, sm: 56 }, 
                    mr: 2,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  }}
                >
                  <People fontSize="large" />
                </Avatar>
                <Box flex={1}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ 
                      textTransform: 'uppercase', 
                      fontWeight: 700, 
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }, 
                      display: 'block', 
                      mb: 0.5,
                      letterSpacing: 1,
                    }}
                  >
                    Total Customers
                  </Typography>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 800, 
                      color: 'info.main', 
                      fontSize: { xs: '2rem', sm: '2.5rem' }, 
                      lineHeight: 1,
                    }}
                  >
                    {stats.totalUsers}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ p: 0 }}>
              <Button 
                size="small" 
                fullWidth 
                onClick={() => navigate('/admin/users')} 
                sx={{ 
                  py: 1.5, 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  '&:hover': {
                    bgcolor: 'info.light',
                    color: 'info.dark',
                  }
                }}
              >
                <Visibility sx={{ mr: 1, fontSize: 18 }} />
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              border: '2px solid',
              borderColor: 'warning.main',
              borderRadius: 3,
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                borderColor: 'warning.dark',
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3 } }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'warning.main', 
                    width: { xs: 50, sm: 56 }, 
                    height: { xs: 50, sm: 56 }, 
                    mr: 2,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  }}
                >
                  <AttachMoney fontSize="large" />
                </Avatar>
                <Box flex={1}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ 
                      textTransform: 'uppercase', 
                      fontWeight: 700, 
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }, 
                      display: 'block', 
                      mb: 0.5,
                      letterSpacing: 1,
                    }}
                  >
                    Total Revenue
                  </Typography>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 800, 
                      color: 'warning.main', 
                      fontSize: { xs: '1.3rem', sm: '1.5rem' }, 
                      lineHeight: 1,
                    }}
                  >
                    {formatCurrency(stats.totalRevenue)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ p: 0 }}>
              <Button 
                size="small" 
                fullWidth 
                onClick={() => navigate('/admin/reports')} 
                sx={{ 
                  py: 1.5, 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  '&:hover': {
                    bgcolor: 'warning.light',
                    color: 'warning.dark',
                  }
                }}
              >
                <TrendingUp sx={{ mr: 1, fontSize: 18 }} />
                View Reports
              </Button>
            </CardActions>
          </Card>
        </Grid>
        </Grid>

        {/* Quick Actions */}
        <Paper 
          sx={{ 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: 4,
            p: { xs: 3, sm: 4 },
            mb: 4,
            mt: 4,
            border: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <Box display="flex" alignItems="center" mb={3}>
            <Box
              sx={{
                bgcolor: 'warning.main',
                borderRadius: 2,
                p: 1,
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ fontSize: '1.5rem' }}>⚡</Typography>
            </Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              }}
            >
              Quick Actions
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 2, sm: 2, md: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<Add />}
                onClick={handleOpenAdd}
                sx={{ 
                  bgcolor: 'success.main',
                  color: 'white',
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    bgcolor: 'success.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(46, 125, 50, 0.4)',
                  }
                }}
              >
                Add Product
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<Edit />}
                onClick={() => navigate('/admin/products')}
                sx={{
                  borderWidth: 2,
                  borderColor: 'success.main',
                  color: 'success.main',
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: 'success.dark',
                    bgcolor: 'success.light',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Manage Products
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<LocalShipping />}
                onClick={() => navigate('/admin/orders')}
                sx={{
                  borderWidth: 2,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: 'primary.dark',
                    bgcolor: 'primary.light',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Order Management
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<People />}
                onClick={() => navigate('/admin/users')}
                sx={{
                  borderWidth: 2,
                  borderColor: 'info.main',
                  color: 'info.main',
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: 'info.dark',
                    bgcolor: 'info.light',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Manage Users
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Recent Orders and Products */}
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {/* Recent Orders */}
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: { xs: 2.5, sm: 3 }, 
                borderRadius: 3, 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 6px 30px rgba(0,0,0,0.12)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <Box display="flex" alignItems="center" mb={2.5}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 40, height: 40 }}>
                  <ShoppingCart />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  Recent Orders
                </Typography>
              </Box>
              {recentOrders.length > 0 ? (
                <List sx={{ pt: 0 }}>
                  {recentOrders.map((order, index) => (
                    <React.Fragment key={order.id}>
                      <ListItem 
                        sx={{ 
                          px: 0,
                          py: 2,
                          '&:hover': {
                            bgcolor: 'action.hover',
                            borderRadius: 2,
                            px: 1.5,
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: getOrderStatusColor(order.status) + '.main', width: 45, height: 45 }}>
                            <ShoppingCart />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                              Order #{order.id}
                            </Typography>
                          }
                          secondary={
                            <Box mt={0.5}>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                                {order.user?.name || 'N/A'} • {formatCurrency(order.totalAmount)}
                              </Typography>
                              <Chip
                                label={order.status?.replace('_', ' ').toUpperCase()}
                                size="small"
                                color={getOrderStatusColor(order.status)}
                                sx={{ mt: 0.5, fontSize: '0.7rem', height: 22 }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < recentOrders.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box 
                  sx={{ 
                    textAlign: 'center', 
                    py: 4,
                    color: 'text.secondary'
                  }}
                >
                  <Typography>No recent orders</Typography>
                </Box>
              )}
              <Box sx={{ mt: 2, borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => navigate('/admin/orders')}
                  sx={{ 
                    fontWeight: 600,
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.light',
                    }
                  }}
                >
                  View All Orders →
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Recent Products */}
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: { xs: 2.5, sm: 3 }, 
                borderRadius: 3, 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 6px 30px rgba(0,0,0,0.12)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              <Box display="flex" alignItems="center" mb={2.5}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2, width: 40, height: 40 }}>
                  <Inventory />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  Recent Products
                </Typography>
              </Box>
              {recentProducts.length > 0 ? (
                <List sx={{ pt: 0 }}>
                  {recentProducts.map((product, index) => (
                    <React.Fragment key={product.id}>
                      <ListItem 
                        sx={{ 
                          px: 0,
                          py: 2,
                          '&:hover': {
                            bgcolor: 'action.hover',
                            borderRadius: 2,
                            px: 1.5,
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={product.imageUrl}
                            alt={product.name}
                            sx={{ 
                              bgcolor: 'grey.200',
                              width: 45,
                              height: 45,
                              border: '2px solid',
                              borderColor: 'success.light',
                            }}
                          >
                            <Inventory />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                              {product.name}
                            </Typography>
                          }
                          secondary={
                            <Box mt={0.5}>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                                {product.category?.name || 'Uncategorized'} • {formatCurrency(product.price)}
                              </Typography>
                              <Chip
                                label={`Stock: ${product.stockQuantity} ${product.unit || ''}`}
                                size="small"
                                color={product.stockQuantity > 10 ? 'success' : product.stockQuantity > 0 ? 'warning' : 'error'}
                                sx={{ mt: 0.5, fontSize: '0.7rem', height: 22 }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < recentProducts.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box 
                  sx={{ 
                    textAlign: 'center', 
                    py: 4,
                    color: 'text.secondary'
                  }}
                >
                  <Typography>No products available</Typography>
                </Box>
              )}
              <Box sx={{ mt: 2, borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => navigate('/admin/products')}
                  sx={{ 
                    fontWeight: 600,
                    color: 'success.main',
                    '&:hover': {
                      bgcolor: 'success.light',
                    }
                  }}
                >
                  View All Products →
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Add Product Dialog */}
        <Dialog open={addOpen} onClose={handleCloseAdd} fullWidth maxWidth="sm">
          <DialogTitle>Add Product</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleCreateProduct(); }} sx={{ mt: 1 }}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                required
                value={productForm.name}
                onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
              />
              <TextField
                label="Price"
                fullWidth
                margin="normal"
                required
                type="number"
                inputProps={{ min: 0, step: '0.01' }}
                value={productForm.price}
                onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={productForm.category_id}
                  onChange={(e) => setProductForm(prev => ({ ...prev, category_id: e.target.value }))}
                >
                  <MenuItem value="">
                    <em>Unassigned</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Image URL"
                fullWidth
                margin="normal"
                value={productForm.image_url}
                onChange={(e) => setProductForm(prev => ({ ...prev, image_url: e.target.value }))}
              />
              <TextField
                label="Stock Quantity"
                fullWidth
                margin="normal"
                type="number"
                inputProps={{ min: 0, step: 1 }}
                value={productForm.stock_quantity}
                onChange={(e) => setProductForm(prev => ({ ...prev, stock_quantity: e.target.value }))}
              />
              <TextField
                label="Unit"
                fullWidth
                margin="normal"
                value={productForm.unit}
                onChange={(e) => setProductForm(prev => ({ ...prev, unit: e.target.value }))}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={productForm.is_featured}
                    onChange={(e) => setProductForm(prev => ({ ...prev, is_featured: e.target.checked }))}
                    color="primary"
                  />
                }
                label="Feature this product"
                sx={{ mt: 1 }}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={productForm.description}
                onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
              />
              {formError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {formError}
                </Alert>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd} disabled={submitting}>Cancel</Button>
            <Button onClick={handleCreateProduct} variant="contained" disabled={submitting}>
              {submitting ? 'Saving…' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }

  export default AdminDashboard;
