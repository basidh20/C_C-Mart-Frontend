import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import { notificationsAPI } from '../../services/api';

const TestNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testUnreadCount = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await notificationsAPI.getUnreadCount();
      console.log('Unread count response:', response);
      setCount(response.data.count);
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data || err.message);
    }
    setLoading(false);
  };

  const testGetAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await notificationsAPI.getAll();
      console.log('Get all response:', response);
      setNotifications(response.data);
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data || err.message);
    }
    setLoading(false);
  };

  const testGetUnread = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await notificationsAPI.getUnread();
      console.log('Get unread response:', response);
      setNotifications(response.data);
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data || err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log('Token:', localStorage.getItem('token'));
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notification API Test Page
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Test Endpoints
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button variant="contained" onClick={testUnreadCount} disabled={loading}>
            Get Unread Count
          </Button>
          <Button variant="contained" onClick={testGetAll} disabled={loading}>
            Get All Notifications
          </Button>
          <Button variant="contained" onClick={testGetUnread} disabled={loading}>
            Get Unread Only
          </Button>
        </Box>

        {loading && <Typography>Loading...</Typography>}

        {error && (
          <Paper sx={{ p: 2, bgcolor: 'error.light', color: 'white', mb: 2 }}>
            <Typography variant="h6">Error:</Typography>
            <Typography>{JSON.stringify(error, null, 2)}</Typography>
          </Paper>
        )}

        <Typography variant="h6" gutterBottom>
          Unread Count: {count}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Notifications ({notifications.length}):
        </Typography>
        <List>
          {notifications.map((notif) => (
            <ListItem key={notif.id} sx={{ border: '1px solid #ccc', mb: 1 }}>
              <ListItemText
                primary={notif.message}
                secondary={`Status: ${notif.status} | Type: ${notif.notificationType} | Created: ${notif.createdAt}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TestNotifications;
