import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { ShoppingCart, ArrowBack, CheckCircle, Cancel } from '@mui/icons-material';
import { productsAPI } from '../../services/api';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (product.stockQuantity <= 0) {
      toast.error('Product is out of stock');
      return;
    }

    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/products')}
          >
            Back to Products
          </Button>
        </Box>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Alert severity="warning">Product not found</Alert>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Back to Products
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/products')}
          sx={{ mb: 3 }}
        >
          Back to Products
        </Button>

        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={product.imageUrl || 'https://via.placeholder.com/500?text=No+Image'}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/500?text=No+Image';
                }}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 500,
                  objectFit: 'contain',
                  backgroundColor: '#f5f5f5',
                  padding: 2,
                }}
              />
            </Card>
          </Grid>

          {/* Product Information */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>

              {/* Category */}
              {product.category && (
                <Chip
                  label={product.category.name}
                  color="primary"
                  size="small"
                  sx={{ mb: 2 }}
                />
              )}

              {/* Featured Badge */}
              {product.featured && (
                <Chip
                  label="Featured"
                  color="secondary"
                  size="small"
                  sx={{ mb: 2, ml: 1 }}
                />
              )}

              <Divider sx={{ my: 2 }} />

              {/* Price */}
              <Typography variant="h5" color="primary" gutterBottom>
                Rs. {product.price?.toFixed(2)}
              </Typography>

              {/* Stock Status */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {product.stockQuantity > 0 ? (
                  <>
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                    <Typography variant="body1" color="success.main">
                      In Stock ({product.stockQuantity} available)
                    </Typography>
                  </>
                ) : (
                  <>
                    <Cancel color="error" sx={{ mr: 1 }} />
                    <Typography variant="body1" color="error.main">
                      Out of Stock
                    </Typography>
                  </>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Description */}
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description || 'No description available.'}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Add to Cart Button */}
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.stockQuantity <= 0}
                sx={{ mt: 2 }}
              >
                {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ProductDetails;










