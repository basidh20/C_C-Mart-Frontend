import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Alert,
} from '@mui/material';
import {
  LocalShipping,
  Schedule,
  LocationOn,
  Payment,
  CheckCircle,
  Info,
  Phone,
} from '@mui/icons-material';

function DeliveryInfo() {
  const deliveryZones = [
    {
      zone: 'Zone 1 - Central Kurunegala',
      areas: ['Main Road', 'Clock Tower Area', 'Hospital Junction', 'Bus Stand'],
      fee: 'Free',
      time: '1-2 hours',
      minOrder: 'Rs. 1,500',
    },
    {
      zone: 'Zone 2 - Extended Kurunegala',
      areas: ['Polgahawela Road', 'Kandy Road', 'Dambulla Road', 'Chilaw Road'],
      fee: 'Rs. 150',
      time: '2-3 hours',
      minOrder: 'Rs. 2,000',
    },
    {
      zone: 'Zone 3 - Outer Areas',
      areas: ['Wariyapola', 'Kuliyapitiya', 'Pannala', 'Melsiripura'],
      fee: 'Rs. 300',
      time: '3-4 hours',
      minOrder: 'Rs. 2,500',
    },
  ];

  const deliverySteps = [
    'Place your order online or via WhatsApp',
    'Receive order confirmation within 15 minutes',
    'Our team prepares your fresh groceries',
    'Delivery rider dispatched to your location',
    'Receive your groceries with a smile!',
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Delivery Information
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            Fresh groceries delivered to your doorstep
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '600px', mx: 'auto' }}>
            We deliver fresh groceries across Kurunegala and surrounding areas. 
            Check our delivery zones, timings, and policies below.
          </Typography>
        </Box>

        {/* Key Features */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Schedule color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Same Day Delivery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Orders before 2 PM delivered same day
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <CheckCircle color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Fresh Guarantee
              </Typography>
              <Typography variant="body2" color="text.secondary">
                100% fresh produce guarantee
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <Payment color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Cash on Delivery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pay when you receive your order
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Delivery Zones */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Delivery Zones & Charges
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mb: 6, opacity: 0.8 }}>
            Check if we deliver to your area and the applicable charges
          </Typography>
          
          <Grid container spacing={4}>
            {deliveryZones.map((zone, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOn color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="h3">
                        {zone.zone}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Coverage Areas:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {zone.areas.map((area, idx) => (
                          <Chip 
                            key={idx} 
                            label={area} 
                            size="small" 
                            variant="outlined" 
                          />
                        ))}
                      </Box>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Delivery Fee:
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {zone.fee}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Delivery Time:
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {zone.time}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          Minimum Order:
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {zone.minOrder}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Delivery Process */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            How Delivery Works
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mb: 6, opacity: 0.8 }}>
            Simple steps from order to doorstep
          </Typography>
          
          <Paper elevation={2} sx={{ p: 4 }}>
            <List>
              {deliverySteps.map((step, index) => (
                <ListItem key={index} sx={{ py: 2 }}>
                  <ListItemIcon>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      {index + 1}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={step}
                    primaryTypographyProps={{ variant: 'h6' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Delivery Schedule */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Delivery Schedule
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Regular Delivery Hours
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Monday - Sunday:</strong> 8:00 AM - 8:00 PM
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Same-Day Delivery
                </Typography>
                <Typography variant="body1">
                  Orders placed before <strong>2:00 PM</strong> are eligible for same-day delivery.
                  Orders after 2:00 PM will be delivered the next day.
                </Typography>
              </Box>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Emergency deliveries available for urgent orders. 
                  Call +94 37 222 3456 for assistance.
                </Typography>
              </Alert>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Payment Options
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Payment color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Cash on Delivery"
                    secondary="Pay in cash when you receive your order"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Payment color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Bank Transfer"
                    secondary="Transfer to our bank account and share receipt"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Payment color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Mobile Payment"
                    secondary="eZ Cash, Dialog Pay, or other mobile wallets"
                  />
                </ListItem>
              </List>
              
              <Alert severity="warning" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Please have exact change ready for cash payments.
                </Typography>
              </Alert>
            </Paper>
          </Grid>
        </Grid>

        {/* Contact for Delivery */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Questions About Delivery?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Our friendly team is here to help with any delivery-related questions
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<Phone />}
              label="Call: +94 37 222 3456"
              variant="filled"
              sx={{ bgcolor: 'white', color: 'primary.main' }}
            />
            <Chip
              icon={<Info />}
              label="WhatsApp: +94 77 123 4567"
              variant="filled"
              sx={{ bgcolor: 'white', color: 'primary.main' }}
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default DeliveryInfo;










