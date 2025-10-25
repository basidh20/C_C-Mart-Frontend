import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link, 
  IconButton,
  Divider,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  Send,
  CreditCard,
  LocalShipping,
  Security,
  Verified,
  Store,
} from '@mui/icons-material';

function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe email:', email);
    setEmail('');
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a1a1a',
        color: 'white',
        mt: 'auto',
      }}
    >
      {/* Trust Badges Section */}
      <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', py: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Security sx={{ fontSize: 40, mb: 1, color: 'secondary.main' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Secure Payment
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.400' }}>
                  100% Protected
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Verified sx={{ fontSize: 40, mb: 1, color: 'secondary.main' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Quality Products
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.400' }}>
                  Fresh & Authentic
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Phone sx={{ fontSize: 40, mb: 1, color: 'secondary.main' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  24/7 Support
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.400' }}>
                  Always Here to Help
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component="img"
                src="/logo.svg"
                alt="C&C Mart Logo"
                sx={{
                  height: 60,
                  width: 'auto',
                  mr: 1.5,
                  filter: 'brightness(0) invert(1)', // Make logo white for dark footer
                }}
                onError={(e) => {
                  // Fallback to icon if logo not found
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <Store 
                sx={{ 
                  fontSize: 36, 
                  mr: 1, 
                  color: 'secondary.main',
                  display: 'none', // Hidden by default, shown if image fails
                }} 
              />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1 }}>
                  C&C Mart
                </Typography>
                <Typography variant="caption" sx={{ color: 'secondary.main' }}>
                  Fresh. Community. Sustainable.
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: 'grey.400', lineHeight: 1.7 }}>
              Your trusted neighborhood grocery store in Kurunegala. 
              Delivering fresh produce, quality products, and excellent service since 2009.
            </Typography>
            
            {/* Contact Info */}
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20, color: 'secondary.main' }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  123 Main Street, Kurunegala, Sri Lanka
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20, color: 'secondary.main' }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  +94 37 222 3456
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20, color: 'secondary.main' }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  info@ccmart.lk
                </Typography>
              </Box>
            </Stack>

            {/* Social Media */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: 'white',
                    '&:hover': { bgcolor: '#1877f2', transform: 'translateY(-2px)' },
                    transition: 'all 0.3s',
                  }}
                  aria-label="Facebook"
                >
                  <Facebook />
                </IconButton>
                <IconButton 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: 'white',
                    '&:hover': { bgcolor: '#1da1f2', transform: 'translateY(-2px)' },
                    transition: 'all 0.3s',
                  }}
                  aria-label="Twitter"
                >
                  <Twitter />
                </IconButton>
                <IconButton 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: 'white',
                    '&:hover': { bgcolor: '#e4405f', transform: 'translateY(-2px)' },
                    transition: 'all 0.3s',
                  }}
                  aria-label="Instagram"
                >
                  <Instagram />
                </IconButton>
                <IconButton 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: 'white',
                    '&:hover': { bgcolor: '#0077b5', transform: 'translateY(-2px)' },
                    transition: 'all 0.3s',
                  }}
                  aria-label="LinkedIn"
                >
                  <LinkedIn />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              <Link 
                href="/products" 
                underline="hover"
                sx={{ 
                  color: 'grey.400',
                  '&:hover': { color: 'secondary.main' },
                  transition: 'color 0.2s',
                }}
              >
                Shop Products
              </Link>
              <Link 
                href="/cart" 
                underline="hover"
                sx={{ 
                  color: 'grey.400',
                  '&:hover': { color: 'secondary.main' },
                  transition: 'color 0.2s',
                }}
              >
                Shopping Cart
              </Link>
              <Link 
                href="/orders" 
                underline="hover"
                sx={{ 
                  color: 'grey.400',
                  '&:hover': { color: 'secondary.main' },
                  transition: 'color 0.2s',
                }}
              >
                Track Orders
              </Link>
              <Link 
                href="/about" 
                underline="hover"
                sx={{ 
                  color: 'grey.400',
                  '&:hover': { color: 'secondary.main' },
                  transition: 'color 0.2s',
                }}
              >
                About Us
              </Link>
            </Stack>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              Customer Service
            </Typography>
            <Stack spacing={1.5}>
              <Link 
                href="/contact" 
                underline="hover"
                sx={{ 
                  color: 'grey.400',
                  '&:hover': { color: 'secondary.main' },
                  transition: 'color 0.2s',
                }}
              >
                Contact Us
              </Link>
              <Link 
                href="/delivery" 
                underline="hover"
                sx={{ 
                  color: 'grey.400',
                  '&:hover': { color: 'secondary.main' },
                  transition: 'color 0.2s',
                }}
              >
                Delivery Info
              </Link>
              <Link 
                href="/returns" 
                underline="hover"
                sx={{ 
                  color: 'grey.400',
                  '&:hover': { color: 'secondary.main' },
                  transition: 'color 0.2s',
                }}
              >
                Returns Policy
              </Link>
              <Link 
                href="/faq" 
                underline="hover"
                sx={{ 
                  color: 'grey.400',
                  '&:hover': { color: 'secondary.main' },
                  transition: 'color 0.2s',
                }}
              >
                FAQ
              </Link>
            </Stack>
          </Grid>

          {/* Newsletter Signup */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'grey.400', lineHeight: 1.7 }}>
              Get the latest deals, offers, and updates directly to your inbox!
            </Typography>
            <Box component="form" onSubmit={handleNewsletterSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'secondary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'secondary.main',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.5)',
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<Send />}
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'white',
                  py: 1.2,
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                Subscribe Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Payment Methods */}
      <Box sx={{ bgcolor: 'rgba(0,0,0,0.3)', py: 2 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" sx={{ color: 'grey.400', mr: 2 }}>
              We Accept:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <CreditCard sx={{ fontSize: 32, color: 'grey.400' }} />
              <Typography variant="caption" sx={{ color: 'grey.400' }}>
                Visa • Mastercard • Amex • PayPal
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Bottom Bar */}
      <Box sx={{ bgcolor: 'rgba(0,0,0,0.5)', py: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: 'grey.500', textAlign: { xs: 'center', md: 'left' } }}>
                © 2024 C&C Mart, Kurunegala. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, gap: 3, flexWrap: 'wrap' }}>
                <Link 
                  href="#" 
                  underline="hover"
                  sx={{ 
                    color: 'grey.500',
                    fontSize: '0.875rem',
                    '&:hover': { color: 'secondary.main' },
                  }}
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="#" 
                  underline="hover"
                  sx={{ 
                    color: 'grey.500',
                    fontSize: '0.875rem',
                    '&:hover': { color: 'secondary.main' },
                  }}
                >
                  Terms of Service
                </Link>
                <Link 
                  href="#" 
                  underline="hover"
                  sx={{ 
                    color: 'grey.500',
                    fontSize: '0.875rem',
                    '&:hover': { color: 'secondary.main' },
                  }}
                >
                  Cookie Policy
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
