import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import Layout from './components/Layout/Layout';
import AdminLayout from './layouts/AdminLayout';
import PrivateRoute from './components/Auth/PrivateRoute';
import AdminRoute from './components/Auth/AdminRoute';
import LoadingScreen from './components/Layout/LoadingScreen';

// Public Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Products from './pages/Products/Products';
import ProductDetails from './pages/Products/ProductDetails';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import DeliveryInfo from './pages/Info/DeliveryInfo';
import FAQ from './pages/Info/FAQ';
import Returns from './pages/Info/Returns';

// Customer Pages (Member 1)
import Profile from './pages/Customer/Profile';
import AccountSettings from './pages/Customer/AccountSettings';

// Shopping Pages (Member 3)
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Orders from './pages/Orders/Orders';
import OrderDetails from './pages/Orders/OrderDetails';

// Admin Pages (Member 4)
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProductManagement from './pages/Admin/ProductManagement';
import AdminOrderManagement from './pages/Admin/AdminOrderManagement';
import UserManagement from './pages/Admin/UserManagement';
import ReportsAnalytics from './pages/Admin/ReportsAnalytics';
import AdminDeliveryAgents from './pages/Admin/AdminDeliveryAgents';
import TestAPI from './pages/Test/TestAPI';
import TestOrdersAPI from './pages/Test/TestOrdersAPI';
import DiagnosticPage from './pages/Test/DiagnosticPage';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loading screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="delivery" element={<DeliveryInfo />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="returns" element={<Returns />} />
          <Route path="test" element={<TestAPI />} />
          <Route path="test-orders" element={<TestOrdersAPI />} />
          
          {/* Customer Routes (Private) */}
          <Route path="profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="account" element={
            <PrivateRoute>
              <AccountSettings />
            </PrivateRoute>
          } />
          
          {/* Shopping Routes */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          <Route path="orders" element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          } />
          <Route path="orders/:id" element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          } />
          
          {/* Test & Diagnostic Routes */}
          <Route path="diagnostic" element={<DiagnosticPage />} />
          <Route path="test" element={<TestAPI />} />
          <Route path="test-orders" element={<TestOrdersAPI />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Admin Routes - Separate from Layout to avoid showing footer */}
        <Route path="admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<AdminOrderManagement />} />
          <Route path="delivery-agents" element={<AdminDeliveryAgents />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reports" element={<ReportsAnalytics />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
