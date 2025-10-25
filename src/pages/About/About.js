import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Avatar,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import {
  Store,
  EnergySavingsLeaf,
  LocalShipping,
  Group,
  Star,
  AccessTime,
  LocationOn,
  Phone,
  TrendingUp,
  VerifiedUser,
  Favorite,
  EmojiEvents,
  ShoppingCart,
  People,
} from '@mui/icons-material';

function About() {
  const stats = [
    {
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      value: '10,000+',
      label: 'Products Sold Monthly',
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      value: '5,000+',
      label: 'Happy Customers',
    },
    {
      icon: <Star sx={{ fontSize: 40 }} />,
      value: '4.8/5',
      label: 'Customer Reviews',
    },
  ];

  const milestones = [
    {
      year: '2009',
      title: 'C&C Mart Founded',
      description: 'Started as a small family grocery store on Main Road, Kurunegala',
      icon: <Store />,
    },
    {
      year: '2015',
      title: 'Expansion',
      description: 'Expanded our store and started home delivery service',
      icon: <TrendingUp />,
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched online shopping platform during pandemic',
      icon: <ShoppingCart />,
    },
    {
      year: '2024',
      title: 'Modern E-commerce',
      description: 'Redesigned website with enhanced user experience and features',
      icon: <EmojiEvents />,
    },
  ];

  const values = [
    {
      icon: <EnergySavingsLeaf sx={{ fontSize: 48 }} color="primary" />,
      title: 'Fresh & Quality',
      description: 'We source fresh produce daily from local farmers and maintain the highest quality standards for all our products.',
    },
    {
      icon: <Favorite sx={{ fontSize: 48 }} color="primary" />,
      title: 'Community First',
      description: 'Proudly serving the Kurunegala community with dedication, care, and a commitment to supporting local suppliers.',
    },
    {
      icon: <Star sx={{ fontSize: 48 }} color="primary" />,
      title: 'Customer Satisfaction',
      description: 'Your satisfaction is our top priority. We go above and beyond to ensure a delightful shopping experience.',
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 48 }} color="primary" />,
      title: 'Reliable Service',
      description: 'Consistent, timely service you can depend on every day. Trust built through years of dedicated service.',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <Box
        sx={{
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
            backgroundImage: 'url("/about-hero-background.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.85) 0%, rgba(27, 94, 32, 0.9) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 2,
              }}
            >
              🏪 About Us
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.95,
                maxWidth: '700px',
                mx: 'auto',
                fontWeight: 400,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              Your Trusted Neighborhood Grocery Store Since 2009
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
              maxWidth: '900px', 
              mx: 'auto', 
              lineHeight: 1.8,
              fontSize: '1.1rem',
              color: 'text.secondary',
            }}
          >
            Located on Main Road in Kurunegala, C&C Mart has been serving the local community 
            with fresh groceries, quality products, and exceptional service for over 15 years. 
            What started as a small family business has grown into a modern grocery store 
            that combines traditional values with contemporary convenience, bringing you the best 
            shopping experience both online and in-store.
          </Typography>
        </Box>

        {/* Statistics Section */}
        <Box sx={{ mb: 10 }}>
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    height: '100%',
                    minHeight: '250px',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url("/about-stat-${index + 1}.jpg")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      zIndex: 0,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.85) 0%, rgba(27, 94, 32, 0.9) 100%)',
                      zIndex: 1,
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                      '&::after': {
                        background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.75) 0%, rgba(27, 94, 32, 0.85) 100%)',
                      },
                    },
                  }}
                >
                  <Box sx={{ flex: 1 }} />
                  <Box sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ mb: 2, opacity: 0.9 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Story */}
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Our Story
          </Typography>
          <Typography 
            variant="body1" 
            textAlign="center" 
            sx={{ mb: 6, opacity: 0.7, maxWidth: '700px', mx: 'auto' }}
          >
            From humble beginnings to becoming Kurunegala's favorite grocery destination
          </Typography>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.9, fontSize: '1.05rem' }}>
                C&C Mart was born from a simple vision: to provide the Kurunegala community 
                with access to fresh, quality groceries at affordable prices. Founded by 
                Mr. Chamindu Dewram in 2009, we started with a small storefront and a 
                big dream to serve our neighbors with integrity and excellence.
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.9, fontSize: '1.05rem' }}>
                Over the years, we have expanded our offerings, improved our services, 
                and embraced technology to better serve you. From traditional in-store 
                shopping to modern online ordering with home delivery, we've evolved 
                while keeping our commitment to quality and service intact.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.9, fontSize: '1.05rem' }}>
                Despite our growth, we remain committed to our core values: quality, 
                freshness, community support, and exceptional customer service. Every 
                product we stock and every service we provide is designed with you in mind.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                href="/products"
                sx={{ mt: 3 }}
              >
                Shop Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="C&C Mart Store"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 3,
                  boxShadow: 6,
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Our Values */}
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Our Values
          </Typography>
          <Typography 
            variant="body1" 
            textAlign="center" 
            sx={{ mb: 6, opacity: 0.7 }}
          >
            The principles that guide everything we do
          </Typography>
          
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={2}
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
                      {value.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Timeline */}
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Our Journey
          </Typography>
          <Typography 
            variant="body1" 
            textAlign="center" 
            sx={{ mb: 6, opacity: 0.7 }}
          >
            Key milestones in our 15-year journey
          </Typography>
          
          <Grid container spacing={4}>
            {milestones.map((milestone, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    position: 'relative',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <Box sx={{ mb: 2, color: 'primary.main' }}>
                    {milestone.icon}
                  </Box>
                  <Chip
                    label={milestone.year}
                    color="primary"
                    sx={{ mb: 2, fontWeight: 'bold', fontSize: '0.9rem' }}
                  />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {milestone.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {milestone.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Location & Contact */}
        <Paper
          elevation={6}
          sx={{
            p: 5,
            mb: 8,
            background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Visit Our Store
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.95, lineHeight: 1.7 }}>
                Come experience our fresh groceries, friendly service, and amazing deals in person! 
                Our dedicated team is ready to help you find everything you need.
              </Typography>
              
              <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />
              
              <Box sx={{ display: 'flex', alignItems: 'start', mb: 3 }}>
                <LocationOn sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Address
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Main Road, Kurunegala, Sri Lanka
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'start', mb: 3 }}>
                <Phone sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Phone
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    +94 37 222 3456
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'start' }}>
                <AccessTime sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Store Hours
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Open Daily: 7:00 AM - 9:00 PM
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Including weekends and public holidays
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Store sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  15+
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.95, fontWeight: 500 }}>
                  Years of Excellence
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, opacity: 0.9 }}>
                  Serving Kurunegala with pride and dedication
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Team Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Meet Our Team
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ mb: 6, opacity: 0.7, maxWidth: '600px', mx: 'auto' }}
          >
            The dedicated people behind C&C Mart's success and your satisfaction
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                elevation={3}
                sx={{ 
                  textAlign: 'center', 
                  p: 4,
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  },
                }}
              >
                <Avatar
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200"
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mx: 'auto', 
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.main',
                  }}
                />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Mr. Chamindu Dewram
                </Typography>
                <Chip 
                  label="Founder & Owner" 
                  color="primary" 
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Visionary leader with 15+ years of experience, committed to serving 
                  the community with quality groceries and exceptional service.
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                elevation={3}
                sx={{ 
                  textAlign: 'center', 
                  p: 4,
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  },
                }}
              >
                <Avatar
                  src="https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=200"
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mx: 'auto', 
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.main',
                  }}
                />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Mrs. Sanduni Fernando
                </Typography>
                <Chip 
                  label="Store Manager" 
                  color="primary" 
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Ensures smooth operations, manages inventory, and maintains 
                  our high service standards with dedication and expertise.
                </Typography>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                elevation={3}
                sx={{ 
                  textAlign: 'center', 
                  p: 4,
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                  },
                }}
              >
                <Avatar
                  src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=200"
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mx: 'auto', 
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.main',
                  }}
                />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Mr. Kasun Silva
                </Typography>
                <Chip 
                  label="Delivery Manager" 
                  color="primary" 
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  Leads our delivery team, ensuring your orders reach you 
                  fresh, on time, and with care every single time.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default About;