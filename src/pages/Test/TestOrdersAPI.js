import React, { useState } from 'react';
import { Container, Box, Button, Typography, Paper, Alert } from '@mui/material';
import { ordersAPI } from '../../services/api';

function TestOrdersAPI() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🧪 TEST: Calling ordersAPI.getOrders()...');
      const response = await ordersAPI.getOrders();
      
      console.log('🧪 TEST: Full response:', response);
      console.log('🧪 TEST: response.data:', response.data);
      console.log('🧪 TEST: response.data type:', typeof response.data);
      console.log('🧪 TEST: Is array?', Array.isArray(response.data));
      console.log('🧪 TEST: Length:', response.data?.length);

      setResult({
        fullResponse: response,
        data: response.data,
        dataType: typeof response.data,
        isArray: Array.isArray(response.data),
        length: response.data?.length || 0,
        firstItem: response.data?.[0] || null,
        status: response.status,
        statusText: response.statusText,
      });

    } catch (err) {
      console.error('🧪 TEST ERROR:', err);
      console.error('🧪 TEST ERROR response:', err.response);
      console.error('🧪 TEST ERROR response data:', err.response?.data);
      
      setError({
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        🧪 Test Orders API
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Button 
          variant="contained" 
          onClick={testAPI} 
          disabled={loading}
          size="large"
        >
          {loading ? 'Testing...' : 'Test GET /api/orders'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">❌ Error:</Typography>
          <pre style={{ overflow: 'auto', fontSize: '12px' }}>
            {JSON.stringify(error, null, 2)}
          </pre>
        </Alert>
      )}

      {result && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom color="success.main">
            ✅ Success!
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">HTTP Status:</Typography>
            <Typography>{result.status} {result.statusText}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Data Type:</Typography>
            <Typography>{result.dataType} {result.isArray ? '(Array ✅)' : '(Not Array ❌)'}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Number of Orders:</Typography>
            <Typography variant="h4" color="primary">{result.length}</Typography>
          </Box>

          {result.firstItem && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">First Order Sample:</Typography>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px'
              }}>
                {JSON.stringify(result.firstItem, null, 2)}
              </pre>
            </Box>
          )}

          <Box>
            <Typography variant="subtitle2">Full Response Data:</Typography>
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '16px', 
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '400px',
              fontSize: '12px'
            }}>
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </Box>
        </Paper>
      )}

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          💡 Open browser console (F12) to see detailed logs
        </Typography>
      </Box>
    </Container>
  );
}

export default TestOrdersAPI;
