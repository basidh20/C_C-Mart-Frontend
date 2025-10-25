import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ShoppingCart,
  Visibility,
  LocalOffer,
  CheckCircle,
  Warning,
} from '@mui/icons-material';

function EnhancedProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const calculateDiscount = () => {
    if (product.originalPrice && product.price < product.originalPrice) {
      const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const discount = calculateDiscount();
  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock === 0;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          '& .product-image': {
            transform: 'scale(1.1)',
          },
          '& .quick-view-btn': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      {/* Badges */}
      <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {discount > 0 && (
          <Chip
            icon={<LocalOffer />}
            label={`-${discount}%`}
            size="small"
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: 2,
            }}
          />
        )}
        {product.isFeatured && (
          <Chip
            label="Featured"
            size="small"
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: 2,
            }}
          />
        )}
        {product.isNew && (
          <Chip
            label="New"
            size="small"
            sx={{
              bgcolor: 'success.main',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: 2,
            }}
          />
        )}
      </Box>

      {/* Stock Status Badge */}
      <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
        {isOutOfStock ? (
          <Chip
            icon={<Warning />}
            label="Out of Stock"
            size="small"
            color="error"
            sx={{ boxShadow: 2, fontWeight: 600 }}
          />
        ) : isLowStock ? (
          <Chip
            icon={<Warning />}
            label={`Only ${product.stock} left`}
            size="small"
            color="warning"
            sx={{ boxShadow: 2, fontWeight: 600 }}
          />
        ) : (
          <Chip
            icon={<CheckCircle />}
            label="In Stock"
            size="small"
            color="success"
            sx={{ boxShadow: 2, fontWeight: 600 }}
          />
        )}
      </Box>

      {/* Product Image */}
      <Box
        sx={{
          position: 'relative',
          paddingTop: '75%', // 4:3 Aspect Ratio
          overflow: 'hidden',
          bgcolor: 'grey.100',
        }}
      >
        <CardMedia
          className="product-image"
          component="img"
          image={product.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={product.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />
        
        {/* Quick View Button */}
        <Box
          className="quick-view-btn"
          sx={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translate(-50%, 20px)',
            opacity: 0,
            transition: 'all 0.3s ease',
          }}
        >
          <Button
            variant="contained"
            startIcon={<Visibility />}
            onClick={() => navigate(`/products/${product.id}`)}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              fontWeight: 600,
              boxShadow: 3,
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
          >
            Quick View
          </Button>
        </Box>
      </Box>

      {/* Product Details */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        {/* Category */}
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'primary.main',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {product.category?.name || 'General'}
        </Typography>

        {/* Product Name */}
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: '1.1rem',
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.6rem',
            mb: 1,
          }}
        >
          {product.name}
        </Typography>

        {/* Description */}
        {product.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 2,
              minHeight: '2.4rem',
            }}
          >
            {product.description}
          </Typography>
        )}

        {/* Price Section */}
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
            <Typography
              variant="h5"
              component="span"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              {formatPrice(product.price)}
            </Typography>
            {product.originalPrice && product.originalPrice > product.price && (
              <Typography
                variant="body2"
                component="span"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                }}
              >
                {formatPrice(product.originalPrice)}
              </Typography>
            )}
          </Box>
          
          {/* Unit Display */}
          {product.unit && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Per {product.unit}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Action Buttons */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock}
          sx={{
            py: 1.2,
            fontWeight: 600,
            fontSize: '0.95rem',
            borderRadius: 2,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.2s',
            ...(isOutOfStock && {
              bgcolor: 'grey.300',
              color: 'grey.600',
            }),
          }}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default EnhancedProductCard;
