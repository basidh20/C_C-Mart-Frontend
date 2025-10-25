import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  Search,
  Clear,
} from '@mui/icons-material';
import { productsAPI } from '../../services/api';

function ProductSearch({ onClose }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.length >= 2) {
        performSearch(searchTerm);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const performSearch = async (term) => {
    try {
      setLoading(true);
      const response = await productsAPI.getProducts({
        search: term,
        limit: 5,
      });
      setSearchResults(response.data.data || []);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowResults(false);
      onClose?.();
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    setShowResults(false);
    onClose?.();
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {loading && <CircularProgress size={20} />}
                {searchTerm && !loading && (
                  <IconButton onClick={handleClear} size="small">
                    <Clear />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </form>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            maxHeight: 400,
            overflow: 'auto',
            boxShadow: 3,
          }}
        >
          <List dense>
            {searchResults.map((product) => (
              <ListItem
                key={product.id}
                button
                onClick={() => handleProductClick(product.id)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={product.image_url}
                    alt={product.name}
                    sx={{ width: 40, height: 40 }}
                  >
                    {product.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {product.category_name}
                      </Typography>
                      <Typography variant="body2" color="primary" fontWeight="bold">
                        Rs. {product.price}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* No Results */}
      {showResults && searchResults.length === 0 && !loading && searchTerm.length >= 2 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            p: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No products found for "{searchTerm}"
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default ProductSearch;










