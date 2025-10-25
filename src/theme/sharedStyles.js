// Shared styling system for consistent theme across all pages
export const sharedStyles = {
  // Page container with consistent padding and responsive design
  pageContainer: {
    minHeight: '100vh',
    py: { xs: 2, sm: 3, md: 4 },
    px: { xs: 1, sm: 2, md: 3 },
  },

  // Page header with gradient background
  pageHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    p: { xs: 2, sm: 3, md: 4 },
    borderRadius: 2,
    mb: { xs: 2, sm: 3, md: 4 },
    boxShadow: 3,
  },

  // Alternative header styles for variety
  headerVariants: {
    blue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    green: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    orange: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    teal: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },

  // Card styling with consistent shadows and hover effects
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2,
    boxShadow: 2,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: 6,
      transform: 'translateY(-4px)',
    },
  },

  // Stats card for dashboard metrics
  statsCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: 2,
    p: 3,
    boxShadow: 3,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: 6,
      transform: 'translateY(-4px)',
    },
  },

  // Bordered stats card variant
  borderedStatsCard: {
    border: '2px solid',
    borderColor: 'primary.main',
    borderRadius: 2,
    p: 3,
    boxShadow: 2,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: 4,
      borderColor: 'primary.dark',
    },
  },

  // Table container with consistent styling
  tableContainer: {
    borderRadius: 2,
    boxShadow: 2,
    overflow: 'auto',
    maxHeight: { xs: 400, sm: 500, md: 600 },
  },

  // Table header styling
  tableHeader: {
    bgcolor: 'primary.main',
    '& .MuiTableCell-head': {
      color: 'white',
      fontWeight: 700,
      fontSize: { xs: '0.875rem', sm: '1rem' },
    },
  },

  // Table row with hover effect
  tableRow: {
    '&:hover': {
      bgcolor: 'action.hover',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },

  // Button styles
  primaryButton: {
    px: { xs: 2, sm: 3 },
    py: { xs: 1, sm: 1.5 },
    fontSize: { xs: '0.875rem', sm: '1rem' },
    fontWeight: 600,
    borderRadius: 2,
    textTransform: 'none',
    boxShadow: 2,
    '&:hover': {
      boxShadow: 4,
    },
  },

  outlinedButton: {
    px: { xs: 2, sm: 3 },
    py: { xs: 1, sm: 1.5 },
    fontSize: { xs: '0.875rem', sm: '1rem' },
    fontWeight: 600,
    borderRadius: 2,
    borderWidth: 2,
    textTransform: 'none',
    '&:hover': {
      borderWidth: 2,
    },
  },

  // Form field styling
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '&:hover fieldset': {
        borderColor: 'primary.main',
      },
    },
  },

  // Search bar styling
  searchBar: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      bgcolor: 'background.paper',
      '&:hover fieldset': {
        borderColor: 'primary.main',
      },
    },
  },

  // Chip styling
  chip: {
    fontWeight: 600,
    borderRadius: 2,
    px: 1,
  },

  // Status chip colors
  statusChips: {
    pending: {
      bgcolor: 'warning.light',
      color: 'warning.dark',
      fontWeight: 700,
    },
    approved: {
      bgcolor: 'info.light',
      color: 'info.dark',
      fontWeight: 700,
    },
    assigned: {
      bgcolor: 'secondary.light',
      color: 'secondary.dark',
      fontWeight: 700,
    },
    in_delivery: {
      bgcolor: 'primary.light',
      color: 'primary.dark',
      fontWeight: 700,
    },
    delivered: {
      bgcolor: 'success.light',
      color: 'success.dark',
      fontWeight: 700,
    },
    cancelled: {
      bgcolor: 'error.light',
      color: 'error.dark',
      fontWeight: 700,
    },
    active: {
      bgcolor: 'success.light',
      color: 'success.dark',
      fontWeight: 700,
    },
    inactive: {
      bgcolor: 'error.light',
      color: 'error.dark',
      fontWeight: 700,
    },
  },

  // Dialog styling
  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: 2,
      p: { xs: 1, sm: 2 },
    },
  },

  // Section title
  sectionTitle: {
    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
    fontWeight: 700,
    mb: { xs: 2, sm: 3 },
    color: 'text.primary',
  },

  // Page title
  pageTitle: {
    fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
    fontWeight: 800,
    mb: 1,
  },

  // Responsive grid spacing
  gridContainer: {
    spacing: { xs: 2, sm: 3, md: 4 },
  },

  // Loading container
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },

  // Error alert
  errorAlert: {
    mb: 3,
    borderRadius: 2,
  },

  // Success alert
  successAlert: {
    mb: 3,
    borderRadius: 2,
  },

  // Avatar styling
  avatar: {
    width: { xs: 40, sm: 48, md: 56 },
    height: { xs: 40, sm: 48, md: 56 },
    bgcolor: 'primary.main',
  },

  // Icon size
  iconSize: {
    xs: 'small',
    sm: 'medium',
    md: 'large',
  },

  // Divider with spacing
  divider: {
    my: { xs: 2, sm: 3 },
  },

  // Paper with padding
  paper: {
    p: { xs: 2, sm: 3, md: 4 },
    borderRadius: 2,
    boxShadow: 2,
  },

  // Metric card colors for analytics
  metricCards: {
    revenue: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
    },
    orders: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: 'white',
    },
    users: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: 'white',
    },
    products: {
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: 'white',
    },
  },
};

// Utility functions
export const formatCurrency = (amount) => {
  return `Rs. ${Number(amount || 0).toFixed(2)}`;
};

export const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status) => {
  const statusLower = status?.toLowerCase();
  switch (statusLower) {
    case 'pending':
      return 'warning';
    case 'approved':
      return 'info';
    case 'assigned':
      return 'secondary';
    case 'in_delivery':
      return 'primary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'error';
    case 'active':
      return 'success';
    case 'inactive':
      return 'error';
    default:
      return 'default';
  }
};

export const getStatusLabel = (status) => {
  if (!status) return 'Unknown';
  return status
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
