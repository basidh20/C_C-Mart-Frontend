import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function AdminOrders() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Order Management
        </Typography>
        <Typography variant="body1">
          Order management page - Part of Member 4's Admin Module.
        </Typography>
      </Box>
    </Container>
  );
}

export default AdminOrders;










