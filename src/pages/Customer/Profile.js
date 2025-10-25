import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Alert,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Home,
  CalendarToday,
  Edit,
  Settings,
  ShoppingBag,
  Notifications,
  Security,
  Receipt,
  Star,
  LocationOn,
  Badge,
  TrendingUp,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileStats, setProfileStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    totalSpent: 0,
  });

  // Mock recent activities - in real app, fetch from API
  const recentActivities = [
    {
      id: 1,
      type: 'login',
      description: 'Logged in to account',
      timestamp: new Date().toLocaleDateString(),
      icon: <Person color="primary" />,
    },
    {
      id: 2,
      type: 'profile_update',
      description: 'Updated profile information',
      timestamp: new Date(Date.now() - 86400000).toLocaleDateString(),
      icon: <Edit color="secondary" />,
    },
    {
      id: 3,
      type: 'password_change',
      description: 'Changed account password',
      timestamp: new Date(Date.now() - 172800000).toLocaleDateString(),
      icon: <Security color="success" />,
    },
  ];

  const quickActions = [
    {
      title: 'Edit Profile',
      description: 'Update your personal information',
      icon: <Edit />,
      action: () => navigate('/account'),
      color: 'primary',
    },
    {
      title: 'View Orders',
      description: 'Check your order history',
      icon: <Receipt />,
      action: () => navigate('/orders'),
      color: 'secondary',
    },
    {
      title: 'Account Settings',
      description: 'Manage security and preferences',
      icon: <Settings />,
      action: () => navigate('/account'),
      color: 'success',
    },
  ];

  useEffect(() => {
    // Mock loading profile stats
    setLoading(true);
    setTimeout(() => {
      setProfileStats({
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        totalSpent: 0,
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (!user) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Profile Header */}
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                sx={{ 
                  width: 80, 
                  height: 80, 
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                }}
              >
                {user.name?.charAt(0)?.toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                Welcome back, {user.name}!
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  icon={<Badge />}
                  label={user.role === 'admin' ? 'Administrator' : 'Customer'}
                  color={user.role === 'admin' ? 'secondary' : 'primary'}
                  size="small"
                />
                <Chip
                  icon={<Star />}
                  label="Active Member"
                  color="success"
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Member since {new Date(user.created_at).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => navigate('/account')}
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {/* User Information */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Personal Information"
                avatar={<Person color="primary" />}
              />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText
                      primary="Full Name"
                      secondary={user.name || 'Not provided'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email Address"
                      secondary={user.email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone Number"
                      secondary={user.phone || 'Not provided'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn />
                    </ListItemIcon>
                    <ListItemText
                      primary="Address"
                      secondary={user.address || 'Not provided'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday />
                    </ListItemIcon>
                    <ListItemText
                      primary="Member Since"
                      secondary={new Date(user.created_at).toLocaleDateString()}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Account Statistics */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Account Overview"
                avatar={<TrendingUp color="primary" />}
              />
              <CardContent>
                {loading ? (
                  <Box sx={{ p: 2 }}>
                    <LinearProgress />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Loading statistics...
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {profileStats.totalOrders}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Orders
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main">
                          {profileStats.completedOrders}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Completed
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="warning.main">
                          {profileStats.pendingOrders}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pending
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="secondary.main">
                          Rs. {profileStats.totalSpent}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Spent
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Quick Actions" />
              <CardContent>
                <Grid container spacing={2}>
                  {quickActions.map((action, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: 2,
                          },
                        }}
                        onClick={action.action}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Box sx={{ color: `${action.color}.main`, mr: 1 }}>
                            {action.icon}
                          </Box>
                          <Typography variant="h6">
                            {action.title}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {action.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Recent Activity"
                avatar={<Notifications color="primary" />}
              />
              <CardContent>
                {recentActivities.length === 0 ? (
                  <Alert severity="info">
                    No recent activity to display.
                  </Alert>
                ) : (
                  <List>
                    {recentActivities.map((activity, index) => (
                      <React.Fragment key={activity.id}>
                        <ListItem>
                          <ListItemIcon>
                            {activity.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={activity.description}
                            secondary={activity.timestamp}
                          />
                        </ListItem>
                        {index < recentActivities.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Need help?</strong> Visit our{' '}
                <Button
                  variant="text"
                  size="small"
                  onClick={() => navigate('/contact')}
                  sx={{ p: 0, textDecoration: 'underline' }}
                >
                  Contact Page
                </Button>{' '}
                or check our{' '}
                <Button
                  variant="text"
                  size="small"
                  onClick={() => navigate('/faq')}
                  sx={{ p: 0, textDecoration: 'underline' }}
                >
                  FAQ
                </Button>{' '}
                for answers to common questions.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Profile;