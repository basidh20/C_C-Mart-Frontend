import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  Alert,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  CheckCircle,
  Cancel,
  DirectionsCar,
  Phone,
  Email,
} from '@mui/icons-material';
import api from '../../services/api';

function AdminDeliveryAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    vehicleType: '',
    vehicleNumber: '',
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await api.get('/delivery-agents');
      setAgents(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching delivery agents:', err);
      setError('Failed to load delivery agents');
      setLoading(false);
    }
  };

  const handleOpenDialog = (agent = null) => {
    if (agent) {
      setEditingAgent(agent);
      setFormData({
        name: agent.name,
        phone: agent.phone,
        email: agent.email || '',
        address: agent.address || '',
        vehicleType: agent.vehicleType || '',
        vehicleNumber: agent.vehicleNumber || '',
      });
    } else {
      setEditingAgent(null);
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        vehicleType: '',
        vehicleNumber: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAgent(null);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingAgent) {
        await api.put(`/delivery-agents/${editingAgent.id}`, formData);
        setSuccess('Delivery agent updated successfully!');
      } else {
        await api.post('/delivery-agents', formData);
        setSuccess('Delivery agent added successfully!');
      }
      handleCloseDialog();
      fetchAgents();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving delivery agent:', err);
      setError(err.response?.data || 'Failed to save delivery agent');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to deactivate this delivery agent?')) {
      try {
        await api.delete(`/delivery-agents/${id}`);
        setSuccess('Delivery agent deactivated successfully!');
        fetchAgents();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        console.error('Error deleting delivery agent:', err);
        setError('Failed to delete delivery agent');
      }
    }
  };

  const handleToggleAvailability = async (id) => {
    try {
      await api.patch(`/delivery-agents/${id}/availability`);
      setSuccess('Availability updated successfully!');
      fetchAgents();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error toggling availability:', err);
      setError('Failed to update availability');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Delivery Agents
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Delivery Agent
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        {/* Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Agents
                </Typography>
                <Typography variant="h4">{agents.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Available
                </Typography>
                <Typography variant="h4" color="success.main">
                  {agents.filter(a => a.isAvailable && a.isActive).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Busy
                </Typography>
                <Typography variant="h4" color="warning.main">
                  {agents.filter(a => !a.isAvailable && a.isActive).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Agents Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Vehicle</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>{agent.name}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone fontSize="small" />
                      {agent.phone}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {agent.email ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Email fontSize="small" />
                        {agent.email}
                      </Box>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {agent.vehicleType ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DirectionsCar fontSize="small" />
                        {agent.vehicleType} ({agent.vehicleNumber})
                      </Box>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {agent.isActive ? (
                        <Chip
                          label="Active"
                          color="success"
                          size="small"
                          icon={<CheckCircle />}
                        />
                      ) : (
                        <Chip
                          label="Inactive"
                          color="default"
                          size="small"
                          icon={<Cancel />}
                        />
                      )}
                      {agent.isActive && (
                        <Chip
                          label={agent.isAvailable ? 'Available' : 'Busy'}
                          color={agent.isAvailable ? 'success' : 'warning'}
                          size="small"
                          onClick={() => handleToggleAvailability(agent.id)}
                          sx={{ cursor: 'pointer' }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(agent)}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(agent.id)}
                      size="small"
                      disabled={!agent.isActive}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {agents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="textSecondary" sx={{ py: 3 }}>
                      No delivery agents found. Add one to get started!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAgent ? 'Edit Delivery Agent' : 'Add New Delivery Agent'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Full Name *"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone Number *"
                  fullWidth
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  label="Address"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="vehicleType"
                  label="Vehicle Type"
                  fullWidth
                  placeholder="e.g., Bike, Car, Van"
                  value={formData.vehicleType}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="vehicleNumber"
                  label="Vehicle Number"
                  fullWidth
                  placeholder="e.g., ABC-1234"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingAgent ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}

export default AdminDeliveryAgents;
