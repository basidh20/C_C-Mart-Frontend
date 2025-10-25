import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { categoriesAPI, productsAPI } from '../../services/api';

function TestAPI() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult('Testing connection...\n');
    
    try {
      // Test categories API
      setResult(prev => prev + 'Testing categories API...\n');
      const categoriesResponse = await categoriesAPI.getCategories();
      setResult(prev => prev + `✅ Categories API: ${categoriesResponse.data.data?.length || 0} categories found\n`);
      
      // Test products API
      setResult(prev => prev + 'Testing products API...\n');
      const productsResponse = await productsAPI.getProducts();
      setResult(prev => prev + `✅ Products API: ${productsResponse.data.data?.length || 0} products found\n`);
      
      setResult(prev => prev + '\n🎉 All tests passed! Backend is connected successfully.\n');
      
    } catch (error) {
      setResult(prev => prev + `❌ Error: ${error.message}\n`);
      if (error.response) {
        setResult(prev => prev + `Status: ${error.response.status}\n`);
        setResult(prev => prev + `Data: ${JSON.stringify(error.response.data)}\n`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        API Connection Test
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={testConnection}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? 'Testing...' : 'Test Backend Connection'}
      </Button>
      
      <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
        <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
          {result || 'Click the button above to test the backend connection.'}
        </Typography>
      </Paper>
    </Box>
  );
}

export default TestAPI;










