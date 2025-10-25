import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function AdminProducts() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Product Management
        </Typography>
        <Typography variant="body1">
          Product management page - Part of Member 4's Admin Module.
        </Typography>
      </Box>
    </Container>
  );
}

export default AdminProducts;










