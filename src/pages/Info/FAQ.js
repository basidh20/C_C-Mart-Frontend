import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Chip,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  ExpandMore,
  ShoppingCart,
  LocalShipping,
  Payment,
  Store,
  Phone,
  Email,
} from '@mui/icons-material';

function FAQ() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqCategories = [
    {
      category: 'Orders & Shopping',
      icon: <ShoppingCart color="primary" />,
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'You can place orders through our website, by calling +94 37 222 3456, or by sending your grocery list via WhatsApp to +94 77 123 4567. Simply browse our products, add items to your cart, and proceed to checkout.',
        },
        {
          question: 'What is the minimum order amount?',
          answer: 'The minimum order amount varies by delivery zone: Zone 1 (Central Kurunegala) - Rs. 1,500, Zone 2 (Extended areas) - Rs. 2,000, Zone 3 (Outer areas) - Rs. 2,500.',
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'Yes, you can modify or cancel your order within 30 minutes of placing it by calling us immediately. Once our team starts preparing your order, modifications may not be possible.',
        },
        {
          question: 'Do you have fresh vegetables and fruits daily?',
          answer: 'Yes! We receive fresh produce daily from local farms and markets. Our vegetables and fruits are sourced fresh every morning to ensure maximum quality and freshness.',
        },
      ],
    },
    {
      category: 'Delivery',
      icon: <LocalShipping color="primary" />,
      faqs: [
        {
          question: 'What are your delivery areas?',
          answer: 'We deliver across Kurunegala and surrounding areas including Polgahawela, Kuliyapitiya, Wariyapola, Pannala, and Melsiripura. Check our delivery zones page for detailed coverage.',
        },
        {
          question: 'How long does delivery take?',
          answer: 'Delivery time depends on your location: Central Kurunegala (1-2 hours), Extended areas (2-3 hours), Outer areas (3-4 hours). Same-day delivery available for orders placed before 2 PM.',
        },
        {
          question: 'Is delivery free?',
          answer: 'Delivery charges vary by zone: Zone 1 (Central Kurunegala) - Free, Zone 2 - Rs. 150, Zone 3 - Rs. 300.',
        },
        {
          question: 'What if I\'m not home during delivery?',
          answer: 'Please ensure someone is available to receive the order. If you\'re not available, you can arrange for a neighbor or family member to receive it, or reschedule the delivery for a convenient time.',
        },
      ],
    },
    {
      category: 'Payment',
      icon: <Payment color="primary" />,
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept cash on delivery, bank transfers, and mobile payments (eZ Cash, Dialog Pay). For bank transfers, please share the receipt with us via WhatsApp.',
        },
        {
          question: 'Do I need to pay in advance?',
          answer: 'No, payment in advance is not required. We accept cash on delivery for your convenience. However, you can pay in advance via bank transfer or mobile payment if you prefer.',
        },
        {
          question: 'Can I pay with a credit card?',
          answer: 'Currently, we don\'t have online credit card processing. We accept cash on delivery, bank transfers, and mobile wallet payments. Credit card facility will be available soon.',
        },
      ],
    },
    {
      category: 'Products & Quality',
      icon: <Store color="primary" />,
      faqs: [
        {
          question: 'How do you ensure product quality?',
          answer: 'We have strict quality control measures. Our team checks all products before packing, and we source from trusted suppliers. We guarantee 100% fresh produce and quality products.',
        },
        {
          question: 'What if I receive damaged or expired products?',
          answer: 'If you receive any damaged or expired products, please contact us immediately. We will replace the items free of charge or provide a full refund for those items.',
        },
        {
          question: 'Do you sell organic products?',
          answer: 'Yes, we have a selection of organic vegetables, fruits, and other organic products. These are clearly marked on our website and in-store. Ask our staff for organic options.',
        },
        {
          question: 'Can I return products I don\'t need?',
          answer: 'Yes, you can return non-perishable products within 24 hours of delivery if they are unopened and in original condition. Perishable items can only be returned if they are damaged or expired.',
        },
      ],
    },
  ];

  const quickHelp = [
    {
      title: 'Call Us',
      description: 'Speak directly with our team',
      contact: '+94 37 222 3456',
      icon: <Phone color="primary" />,
    },
    {
      title: 'WhatsApp',
      description: 'Quick messages and orders',
      contact: '+94 77 123 4567',
      icon: <Phone color="primary" />,
    },
    {
      title: 'Email',
      description: 'Detailed inquiries',
      contact: 'info@ccmart.lk',
      icon: <Email color="primary" />,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            Find answers to common questions about C&C Mart
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Can't find what you're looking for? Contact our friendly team for personalized assistance.
          </Typography>
        </Box>

        {/* FAQ Categories */}
        <Box sx={{ mb: 8 }}>
          {faqCategories.map((category, categoryIndex) => (
            <Box key={categoryIndex} sx={{ mb: 4 }}>
              <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {category.icon}
                  <Typography variant="h4" component="h2" sx={{ ml: 2 }}>
                    {category.category}
                  </Typography>
                </Box>
                
                {category.faqs.map((faq, faqIndex) => (
                  <Accordion
                    key={faqIndex}
                    expanded={expanded === `${categoryIndex}-${faqIndex}`}
                    onChange={handleChange(`${categoryIndex}-${faqIndex}`)}
                    sx={{ mb: 1 }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls={`panel${categoryIndex}-${faqIndex}-content`}
                      id={`panel${categoryIndex}-${faqIndex}-header`}
                    >
                      <Typography variant="h6" component="h3">
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Quick Help Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Still Need Help?
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mb: 6, opacity: 0.8 }}>
            Our team is always ready to assist you
          </Typography>
          
          <Grid container spacing={4}>
            {quickHelp.map((help, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {help.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {help.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {help.description}
                    </Typography>
                    <Chip
                      label={help.contact}
                      color="primary"
                      variant="filled"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Business Hours */}
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
            Business Hours
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Store:</strong> Daily 7:00 AM - 9:00 PM
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Phone Support:</strong> Daily 7:00 AM - 9:00 PM
          </Typography>
          <Typography variant="body1">
            <strong>Online Orders:</strong> 24/7 (Processed during business hours)
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default FAQ;
