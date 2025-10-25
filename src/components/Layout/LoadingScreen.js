import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function LoadingScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f8f9fa',
      }}
    >
      <Box
        component="img"
        src="/logo.svg"
        alt="C&C Mart Logo"
        sx={{
          width: { xs: 150, sm: 200, md: 250 },
          height: 'auto',
          mb: 4,
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              opacity: 1,
              transform: 'scale(1)',
            },
            '50%': {
              opacity: 0.8,
              transform: 'scale(1.05)',
            },
          },
        }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      <CircularProgress 
        size={60}
        thickness={4}
        sx={{ 
          color: 'primary.main',
          mb: 2,
        }} 
      />
      <Typography 
        variant="h5" 
        sx={{ 
          color: 'primary.main',
          fontWeight: 700,
          mb: 1,
        }}
      >
        C&C Mart
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          color: 'text.secondary',
          fontWeight: 500,
        }}
      >
        Fresh. Community. Sustainable.
      </Typography>
    </Box>
  );
}

export default LoadingScreen;
