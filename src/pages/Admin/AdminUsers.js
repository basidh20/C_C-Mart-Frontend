import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function AdminUsers() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Typography variant="body1">
          User management page - Part of Member 4's Admin Module.
        </Typography>
      </Box>
    </Container>
  );
}

export default AdminUsers;










