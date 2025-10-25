import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Alert,
  Divider,
} from '@mui/material';
import {
  AssignmentReturn,
  Schedule,
  CheckCircle,
  Cancel,
  ContactSupport,
  LocalShipping,
  Payment,
  Warning,
} from '@mui/icons-material';

function Returns() {
  const returnCategories = [
    {
      title: 'Damaged Products',
      description: 'Items that arrived damaged or broken',
      action: 'Full refund or replacement',
      timeframe: 'Report within 2 hours of delivery',
      icon: <Warning color="error" />,
    },
    {
      title: 'Expired Products',
      description: 'Products that are past their expiry date',
      action: 'Full refund and replacement',
      timeframe: 'Report immediately upon discovery',
      icon: <Schedule color="warning" />,
    },
    {
      title: 'Wrong Items',
      description: 'Different products than what you ordered',
      action: 'Exchange for correct items',
      timeframe: 'Report within 4 hours of delivery',
      icon: <AssignmentReturn color="info" />,
    },
    {
      title: 'Quality Issues',
      description: 'Products not meeting quality standards',
      action: 'Refund or replacement available',
      timeframe: 'Report within 24 hours',
      icon: <CheckCircle color="success" />,
    },
  ];

  const nonReturnableItems = [
    'Perishable items (vegetables, fruits, dairy) if not damaged or expired',
    'Items that have been used or consumed',
    'Products without original packaging',
    'Custom or special orders',
    'Items ordered incorrectly by customer (unless damaged)',
  ];

  const returnProcess = [
    {
      step: '1. Contact Us',
      description: 'Call +94 37 222 3456 or WhatsApp +94 77 123 4567 to report the issue',
      icon: <ContactSupport color="primary" />,
    },
    {
      step: '2. Provide Details',
      description: 'Share order number, photos of the issue, and description of the problem',
      icon: <AssignmentReturn color="primary" />,
    },
    {
      step: '3. Verification',
      description: 'Our team will verify the issue and approve the return',
      icon: <CheckCircle color="primary" />,
    },
    {
      step: '4. Collection/Return',
      description: 'We will collect the item or you can return it to our store',
      icon: <LocalShipping color="primary" />,
    },
    {
      step: '5. Refund/Replacement',
      description: 'Receive your refund or replacement as per the return policy',
      icon: <Payment color="primary" />,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Returns & Refunds Policy
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            Your satisfaction is our priority
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '600px', mx: 'auto' }}>
            At CCMart, we stand behind the quality of our products. If you're not completely 
            satisfied with your purchase, we're here to help with our straightforward returns policy.
          </Typography>
        </Box>

        {/* Return Categories */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            What Can Be Returned
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mb: 6, opacity: 0.8 }}>
            We accept returns for the following categories
          </Typography>
          
          <Grid container spacing={4}>
            {returnCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      {category.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {category.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {category.description}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {category.action}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {category.timeframe}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Return Process */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            How to Return Items
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mb: 6, opacity: 0.8 }}>
            Simple steps to return or exchange your items
          </Typography>
          
          <Paper elevation={2} sx={{ p: 4 }}>
            <Grid container spacing={4}>
              {returnProcess.map((process, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box sx={{ mr: 2, mt: 0.5 }}>
                      {process.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {process.step}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {process.description}
                      </Typography>
                    </Box>
                  </Box>
                  {index < returnProcess.length - 1 && (
                    <Divider sx={{ mt: 3, display: { lg: 'none' } }} />
                  )}
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        {/* Refund Information */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Refund Timeline
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Schedule color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Cash on Delivery Orders"
                    secondary="Immediate cash refund upon item collection"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Schedule color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Bank Transfer Payments"
                    secondary="Refund processed within 1-2 business days"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Schedule color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Mobile Wallet Payments"
                    secondary="Refund processed within 24 hours"
                  />
                </ListItem>
              </List>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Refunds are processed using the same payment method used for the original purchase.
                </Typography>
              </Alert>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Non-Returnable Items
              </Typography>
              
              <List>
                {nonReturnableItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Cancel color="error" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              
              <Alert severity="warning" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  These items can only be returned if they are damaged, expired, or not as described.
                </Typography>
              </Alert>
            </Paper>
          </Grid>
        </Grid>

        {/* Quality Guarantee */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 6,
            bgcolor: 'success.main',
            color: 'white',
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                100% Quality Guarantee
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                We guarantee the quality and freshness of all our products. If you're not satisfied 
                with any item, we'll make it right with a full refund or replacement.
              </Typography>
              
              <List>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Fresh produce guaranteed daily"
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Quality checked before delivery"
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 0 }}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Hassle-free returns process"
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <AssignmentReturn sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h6">
                  Customer Satisfaction
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Our #1 Priority
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Contact for Returns */}
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
            Need to Return Something?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Contact us immediately for quick resolution
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ContactSupport sx={{ mr: 1 }} />
                <Typography variant="body1">
                  Call: +94 37 222 3456
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ContactSupport sx={{ mr: 1 }} />
                <Typography variant="body1">
                  WhatsApp: +94 77 123 4567
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
            Available Daily: 7:00 AM - 9:00 PM
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Returns;










