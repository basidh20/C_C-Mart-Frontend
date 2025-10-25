import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Warning,
  Info,
  Refresh,
  Storage,
  Image,
  Palette,
  Wifi,
} from '@mui/icons-material';

function DiagnosticPage() {
  const [diagnostics, setDiagnostics] = useState({
    logo: { status: 'checking', message: '' },
    backend: { status: 'checking', message: '' },
    theme: { status: 'checking', message: '' },
    images: { status: 'checking', message: '' },
  });

  const checkLogo = async () => {
    try {
      const response = await fetch('/logo.svg');
      if (response.ok) {
        setDiagnostics(prev => ({
          ...prev,
          logo: { status: 'success', message: 'Logo SVG loaded successfully (2.2KB)' }
        }));
      } else {
        setDiagnostics(prev => ({
          ...prev,
          logo: { status: 'error', message: `Logo failed to load: ${response.status}` }
        }));
      }
    } catch (error) {
      setDiagnostics(prev => ({
        ...prev,
        logo: { status: 'error', message: `Logo error: ${error.message}` }
      }));
    }
  };

  const checkBackend = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/test');
      if (response.ok) {
        setDiagnostics(prev => ({
          ...prev,
          backend: { status: 'success', message: 'Backend API responding on port 8081' }
        }));
      } else {
        setDiagnostics(prev => ({
          ...prev,
          backend: { status: 'warning', message: `Backend returned: ${response.status}` }
        }));
      }
    } catch (error) {
      setDiagnostics(prev => ({
        ...prev,
        backend: { status: 'error', message: `Backend not reachable: ${error.message}` }
        }));
    }
  };

  const checkTheme = () => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const hasMuiTheme = !!document.querySelector('[class*="MuiBox"]');
    
    if (hasMuiTheme) {
      setDiagnostics(prev => ({
        ...prev,
        theme: { status: 'success', message: 'MUI Theme loaded correctly' }
      }));
    } else {
      setDiagnostics(prev => ({
        ...prev,
        theme: { status: 'warning', message: 'MUI components may not be styled' }
      }));
    }
  };

  const checkImages = () => {
    const images = document.querySelectorAll('img');
    const broken = Array.from(images).filter(img => !img.complete || img.naturalHeight === 0);
    
    if (broken.length === 0) {
      setDiagnostics(prev => ({
        ...prev,
        images: { status: 'success', message: `All ${images.length} images loaded` }
      }));
    } else {
      setDiagnostics(prev => ({
        ...prev,
        images: { status: 'warning', message: `${broken.length} of ${images.length} images failed` }
      }));
    }
  };

  const runAllTests = () => {
    setDiagnostics({
      logo: { status: 'checking', message: 'Checking...' },
      backend: { status: 'checking', message: 'Checking...' },
      theme: { status: 'checking', message: 'Checking...' },
      images: { status: 'checking', message: 'Checking...' },
    });

    setTimeout(() => {
      checkLogo();
      checkBackend();
      checkTheme();
      checkImages();
    }, 500);
  };

  useEffect(() => {
    runAllTests();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'error':
        return <Error sx={{ color: 'error.main' }} />;
      case 'warning':
        return <Warning sx={{ color: 'warning.main' }} />;
      default:
        return <Info sx={{ color: 'info.main' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          🔍 System Diagnostics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Check if all components are loading correctly
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<Refresh />}
        onClick={runAllTests}
        sx={{ mb: 3 }}
      >
        Rerun All Tests
      </Button>

      <Grid container spacing={3}>
        {/* Logo Test */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Image sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Logo Test</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getStatusIcon(diagnostics.logo.status)}
                <Typography sx={{ ml: 1 }}>{diagnostics.logo.message}</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, textAlign: 'center' }}>
                <img src="/logo.svg" alt="Logo Preview" style={{ maxHeight: 100 }} />
              </Box>
              <Chip
                label={diagnostics.logo.status.toUpperCase()}
                color={getStatusColor(diagnostics.logo.status)}
                size="small"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Backend Test */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Wifi sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Backend Connection</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getStatusIcon(diagnostics.backend.status)}
                <Typography sx={{ ml: 1 }}>{diagnostics.backend.message}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Expected: http://localhost:8081
              </Typography>
              <Chip
                label={diagnostics.backend.status.toUpperCase()}
                color={getStatusColor(diagnostics.backend.status)}
                size="small"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Theme Test */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Palette sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Theme & Styling</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getStatusIcon(diagnostics.theme.status)}
                <Typography sx={{ ml: 1 }}>{diagnostics.theme.message}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Primary" color="primary" size="small" />
                <Chip label="Secondary" color="secondary" size="small" />
                <Chip label="Success" color="success" size="small" />
                <Chip label="Error" color="error" size="small" />
              </Box>
              <Chip
                label={diagnostics.theme.status.toUpperCase()}
                color={getStatusColor(diagnostics.theme.status)}
                size="small"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Images Test */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Storage sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Image Loading</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getStatusIcon(diagnostics.images.status)}
                <Typography sx={{ ml: 1 }}>{diagnostics.images.message}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Checks all images on the page
              </Typography>
              <Chip
                label={diagnostics.images.status.toUpperCase()}
                color={getStatusColor(diagnostics.images.status)}
                size="small"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Fixes */}
      <Paper elevation={2} sx={{ p: 3, mt: 4, bgcolor: 'info.light', color: 'info.contrastText' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          💡 Quick Fixes
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <CheckCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Logo not showing?"
              secondary="Hard refresh browser: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Backend not responding?"
              secondary="Check if backend is running: http://localhost:8081/api/test"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Styles look broken?"
              secondary="Clear browser cache and reload the page"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Images not loading?"
              secondary="Check browser console (F12) for network errors"
            />
          </ListItem>
        </List>
      </Paper>

      {/* System Info */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <AlertTitle>System Information</AlertTitle>
        <Typography variant="body2">
          <strong>Frontend:</strong> http://localhost:3000<br />
          <strong>Backend:</strong> http://localhost:8081<br />
          <strong>React Version:</strong> {React.version}<br />
          <strong>User Agent:</strong> {navigator.userAgent.substring(0, 80)}...
        </Typography>
      </Alert>
    </Container>
  );
}

export default DiagnosticPage;
