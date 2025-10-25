import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Store,
  LocalShipping,
  WhatsApp,
  Facebook,
  Instagram,
  CheckCircle,
  SupportAgent,
  QuestionAnswer,
} from '@mui/icons-material';

function Contact() {

  const contactInfo = [
    {
      icon: <LocationOn sx={{ fontSize: 40 }} color="primary" />,
      title: 'Store Location',
      content: 'Main Road, Kurunegala',
      subcontent: 'Sri Lanka',
      description: 'Visit our physical store for the best shopping experience',
      action: 'Get Directions',
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} color="primary" />,
      title: 'Phone Number',
      content: '+94 37 222 3456',
      subcontent: 'Hotline Available',
      description: 'Call us for orders, inquiries, or support',
      action: 'Call Now',
    },
    {
      icon: <Email sx={{ fontSize: 40 }} color="primary" />,
      title: 'Email Address',
      content: 'info@ccmart.lk',
      subcontent: 'support@ccmart.lk',
      description: 'Send us an email for detailed inquiries',
      action: 'Send Email',
    },
    {
      icon: <AccessTime sx={{ fontSize: 40 }} color="primary" />,
      title: 'Business Hours',
      content: '7:00 AM - 9:00 PM',
      subcontent: 'Every Day',
      description: 'Open daily, including weekends and holidays',
      action: 'View Schedule',
    },
  ];

  const services = [
    {
      icon: <Store sx={{ fontSize: 48 }} color="primary" />,
      title: 'In-Store Shopping',
      description: 'Browse our fresh selection of groceries in person. Experience quality products and personalized service.',
      features: ['Fresh produce daily', 'Wide product range', 'Friendly staff'],
    },
    {
      icon: <LocalShipping sx={{ fontSize: 48 }} color="primary" />,
      title: 'Home Delivery',
      description: 'Fast and reliable delivery service to your doorstep. Quality products delivered fresh.',
      features: ['Same-day delivery', 'Multiple delivery zones', 'Track your order'],
    },
    {
      icon: <WhatsApp sx={{ fontSize: 48 }} color="primary" />,
      title: 'WhatsApp Orders',
      description: 'Send your grocery list via WhatsApp and we\'ll prepare your order. Quick and convenient!',
      features: ['Quick response', 'Easy ordering', 'Order confirmation'],
    },
  ];

  const faqs = [
    {
      question: 'What are your delivery charges?',
      answer: 'Free delivery for orders above Rs. 2,500. Below that, delivery charge is Rs. 200.',
    },
    {
      question: 'Do you accept card payments?',
      answer: 'Yes! We accept Visa, MasterCard, and mobile payment apps.',
    },
    {
      question: 'Can I return products?',
      answer: 'Yes, you can return any product within 24 hours if you\'re not satisfied.',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
          color: 'white',
          py: 6,
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                mb: 2,
              }}
            >
              📞 Contact Us
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.95,
                maxWidth: '700px',
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              We're Here to Help with All Your Grocery Needs
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {/* Introduction */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '700px', 
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'text.secondary',
            }}
          >
            Whether you have questions about our products, need assistance with your order, 
            or want to provide feedback, we'd love to hear from you. Our friendly team is 
            ready to assist you!
          </Typography>
        </Box>

        {/* Contact Information Cards */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={3}
                sx={{
                  textAlign: 'center',
                  p: 4,
                  height: '100%',
                  transition: 'all 0.3s',
                  borderTop: '4px solid',
                  borderColor: 'primary.main',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                    borderColor: 'secondary.main',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {info.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {info.title}
                  </Typography>
                  <Typography variant="body1" color="primary.main" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {info.content}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {info.subcontent}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {info.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Location Map */}
        <Box sx={{ mb: 10 }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
            <Paper 
              elevation={6} 
              sx={{ 
                p: 5, 
                height: '100%',
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn color="primary" sx={{ fontSize: 32, mr: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Find Our Store
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
                Located on Main Road, Kurunegala - easily accessible with ample parking available. 
                Come visit us for the full C&C Mart experience!
              </Typography>
              
              <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, borderRadius: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  <LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Main Road, Kurunegala
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.95, lineHeight: 1.6 }}>
                  <strong>Landmarks:</strong> Near Kurunegala Clock Tower, opposite People's Bank
                </Typography>
                <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Typography variant="body2" sx={{ opacity: 0.95 }}>
                  <strong>Parking:</strong> Available in front of store
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        </Box>

        {/* Services Section */}
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            How to Shop with Us
          </Typography>
          <Typography 
            variant="body1" 
            textAlign="center" 
            sx={{ mb: 6, opacity: 0.7, maxWidth: '600px', mx: 'auto' }}
          >
            Multiple convenient ways to get your groceries - choose what works best for you!
          </Typography>
          
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={4}
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 10,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 3 }}>
                      {service.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                      {service.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <List dense>
                      {service.features.map((feature, idx) => (
                        <ListItem key={idx} disableGutters>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature}
                            primaryTypographyProps={{
                              variant: 'body2',
                              color: 'text.secondary',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography 
            variant="body1" 
            textAlign="center" 
            sx={{ mb: 6, opacity: 0.7 }}
          >
            Quick answers to common questions
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            {faqs.map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper 
                  elevation={2}
                  sx={{ 
                    p: 3,
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'start', mb: 1 }}>
                    <QuestionAnswer color="primary" sx={{ mr: 2, mt: 0.5 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 5, lineHeight: 1.7 }}>
                    {faq.answer}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Emergency Contact */}
        <Paper
          elevation={8}
          sx={{
            p: 5,
            background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
            color: 'white',
            textAlign: 'center',
            borderRadius: 3,
            mb: 6,
          }}
        >
          <SupportAgent sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Need Urgent Groceries?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.95, maxWidth: '600px', mx: 'auto', lineHeight: 1.7 }}>
            For urgent orders or same-day delivery within Kurunegala, contact us directly. 
            Our team is ready to assist you with your grocery needs!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{ 
                bgcolor: 'white',
                color: 'primary.main',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
              startIcon={<Phone />}
            >
              Call: +94 37 222 3456
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{ 
                bgcolor: '#25D366',
                color: 'white',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: '#20BA5A',
                },
              }}
              startIcon={<WhatsApp />}
            >
              WhatsApp: +94 77 123 4567
            </Button>
          </Box>
        </Paper>

        {/* Social Media */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Connect With Us
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Follow us on social media for updates, offers, and more!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Facebook />}
              sx={{ borderRadius: 2 }}
            >
              Facebook
            </Button>
            <Button
              variant="outlined"
              startIcon={<Instagram />}
              sx={{ borderRadius: 2 }}
            >
              Instagram
            </Button>
            <Button
              variant="outlined"
              startIcon={<WhatsApp />}
              sx={{ borderRadius: 2 }}
            >
              WhatsApp
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Contact;
