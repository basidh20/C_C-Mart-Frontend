import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Container,
  Avatar,
  Paper,
  Divider,
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Store,
  LocalOffer,
  Phone,
  PersonOutline,
  ShoppingBagOutlined,
  InfoOutlined,
  EmailOutlined,
} from '@mui/icons-material';

import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import NotificationBell from './NotificationBell';


function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };


  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          mt: 1.5,
          minWidth: 220,
          borderRadius: 2,
          overflow: 'visible',
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      <Box sx={{ px: 2, py: 1.5, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Welcome back!
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {user?.name || user?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuItem 
        onClick={() => { navigate('/profile'); handleMenuClose(); }}
        sx={{ py: 1.5, '&:hover': { bgcolor: 'primary.light', color: 'white' } }}
      >
        <PersonOutline sx={{ mr: 1.5 }} fontSize="small" />
        My Profile
      </MenuItem>
      <MenuItem 
        onClick={() => { navigate('/orders'); handleMenuClose(); }}
        sx={{ py: 1.5, '&:hover': { bgcolor: 'primary.light', color: 'white' } }}
      >
        <ShoppingBagOutlined sx={{ mr: 1.5 }} fontSize="small" />
        My Orders
      </MenuItem>
      {user?.role?.toLowerCase() === 'admin' && (
        <>
          <Divider />
          <MenuItem 
            onClick={() => { navigate('/admin'); handleMenuClose(); }}
            sx={{ py: 1.5, bgcolor: 'warning.light', '&:hover': { bgcolor: 'warning.main' } }}
          >
            <Store sx={{ mr: 1.5 }} fontSize="small" />
            Admin Dashboard
          </MenuItem>
        </>
      )}
      <Divider />
      <MenuItem 
        onClick={handleLogout}
        sx={{ py: 1.5, color: 'error.main', '&:hover': { bgcolor: 'error.light', color: 'white' } }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      {/* Top Bar */}
      <Box 
        sx={{ 
          bgcolor: 'primary.dark', 
          color: 'white',
          py: 0.5,
          fontSize: '0.875rem',
        }}
      >
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Phone sx={{ fontSize: 16 }} />
                <Typography variant="caption">+94 37 222 3456</Typography>
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                <EmailOutlined sx={{ fontSize: 16 }} />
                <Typography variant="caption">info@ccmart.lk</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Header */}
      <AppBar 
        position="sticky" 
        sx={{ 
          bgcolor: 'white', 
          color: 'text.primary',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 1 }}>
            {/* Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'primary.main',
                mr: 4,
                '&:hover': { opacity: 0.8 },
                transition: 'opacity 0.2s',
              }}
            >
              <Box
                component="img"
                src="/logo.svg"
                alt="C&C Mart Logo"
                sx={{
                  height: { xs: 45, md: 55 },
                  width: 'auto',
                  mr: 1.5,
                }}
                onError={(e) => {
                  // Fallback to icon if logo not found
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <Store 
                sx={{ 
                  fontSize: 40, 
                  mr: 1,
                  display: 'none', // Hidden by default, shown if image fails
                }} 
              />
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1,
                    color: '#1b5e20',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  C&C Mart
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#7cb342',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    fontSize: '0.7rem',
                  }}
                >
                  Fresh. Community. Sustainable.
                </Typography>
              </Box>
            </Box>

            {/* Navigation Links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button
                component={RouterLink}
                to="/products"
                startIcon={<ShoppingBagOutlined />}
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 600,
                  '&:hover': { 
                    bgcolor: 'primary.main',
                    color: 'white',
                  },
                  borderRadius: 2,
                  px: 2,
                }}
              >
                Shop Products
              </Button>
              <Button
                component={RouterLink}
                to="/about"
                startIcon={<InfoOutlined />}
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 600,
                  '&:hover': { 
                    bgcolor: 'primary.main',
                    color: 'white',
                  },
                  borderRadius: 2,
                  px: 2,
                }}
              >
                About Us
              </Button>
              <Button
                component={RouterLink}
                to="/contact"
                startIcon={<Phone />}
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 600,
                  '&:hover': { 
                    bgcolor: 'primary.main',
                    color: 'white',
                  },
                  borderRadius: 2,
                  px: 2,
                }}
              >
                Contact
              </Button>
            </Box>

            {/* Cart Icon */}
            <IconButton
              component={RouterLink}
              to="/cart"
              sx={{ 
                mr: 2,
                bgcolor: 'primary.light',
                color: 'white',
                '&:hover': { 
                  bgcolor: 'primary.main',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s',
              }}
            >
              <Badge 
                badgeContent={isAuthenticated ? itemCount : 0} 
                color="secondary"
                invisible={!isAuthenticated || itemCount === 0}
                max={99}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Notification Bell - Only for authenticated customers */}
            {isAuthenticated && user?.role?.toUpperCase() === 'CUSTOMER' && <NotificationBell />}

            {/* User Menu */}
            {isAuthenticated ? (
              <Box>
                <Button
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  startIcon={
                    user?.profileImage ? (
                      <Avatar src={user.profileImage} alt={user.name} sx={{ width: 32, height: 32 }} />
                    ) : (
                      <AccountCircle />
                    )
                  }
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white',
                    },
                  }}
                >
                  {user?.name || 'Account'}
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  sx={{ 
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  sx={{ 
                    bgcolor: 'secondary.main',
                    color: 'white',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'secondary.dark',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {renderMenu}
    </>
  );
}

export default Header;
