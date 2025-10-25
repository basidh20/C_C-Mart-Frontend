import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Snackbar,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  CheckBox,
  CheckBoxOutlineBlank,
} from '@mui/icons-material';
import { productsAPI, categoriesAPI } from '../../services/api';
import { toast } from 'react-toastify';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showUnpublished, setShowUnpublished] = useState(false);
  const [showPublished, setShowPublished] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    unit: '',
    categoryId: '',
    imageUrl: '',
    isFeatured: false,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProducts();
      console.log('Fetched products response:', response);
      // Backend returns array directly in response.data
      const productList = Array.isArray(response.data) 
        ? response.data 
        : response.data?.data || [];
      console.log('Product list count:', productList.length);
      setProducts(productList);
      setError('');
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message 
        || error.response?.data 
        || 'Failed to load products';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...');
      const response = await categoriesAPI.getCategories();
      console.log('Categories response:', response);
      // Backend returns array directly in response.data
      const categoryList = Array.isArray(response.data) 
        ? response.data 
        : response.data?.data || [];
      console.log('Categories list:', categoryList, 'Count:', categoryList.length);
      setCategories(categoryList);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity,
        unit: product.unit,
        categoryId: product.category?.id || '',
        imageUrl: product.imageUrl,
        isFeatured: product.isFeatured,
        isActive: product.isActive !== false, // Ensure it's true if not explicitly false
      });
      setImagePreview(product.imageUrl);
      setImageFile(null);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        unit: '',
        categoryId: '',
        imageUrl: '',
        isFeatured: false,
        isActive: true, // New products are active by default
      });
      setImagePreview(null);
      setImageFile(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          imageUrl: reader.result, // Use base64 for now
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.price || !formData.categoryId) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (parseFloat(formData.price) <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }
    
    if (parseInt(formData.stockQuantity) < 0) {
      toast.error('Stock quantity cannot be negative');
      return;
    }
    
    try {
      // Prepare data with proper types
      const productData = {
        name: formData.name.trim(),
        description: formData.description?.trim() || '',
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity) || 0,
        unit: formData.unit?.trim() || 'piece',
        categoryId: parseInt(formData.categoryId),
        imageUrl: formData.imageUrl?.trim() || '',
        isFeatured: Boolean(formData.isFeatured),
        isActive: true,
      };
      
      console.log('Submitting product data:', productData);
      
      if (editingProduct) {
        const response = await productsAPI.updateProduct(editingProduct.id, productData);
        console.log('Update response:', response);
        toast.success('Product updated successfully!');
      } else {
        const response = await productsAPI.createProduct(productData);
        console.log('Create response:', response);
        toast.success('Product created successfully!');
      }
      
      await fetchProducts();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving product:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message 
        || error.response?.data 
        || error.message 
        || 'Failed to save product';
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      console.log('Deleting product:', productId);
      const response = await productsAPI.deleteProduct(productId);
      console.log('Delete response:', response);
      
      const actionMessage = response?.data?.message
        || (response?.data?.deactivated ? 'Product deactivated successfully!' : 'Product deleted successfully!');
      toast.success(actionMessage);
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message 
        || error.response?.data 
        || error.message 
        || 'Failed to delete product';
      toast.error(typeof errorMessage === 'string' ? errorMessage : 'Failed to delete product');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category?.id == selectedCategory;
    
    // Handle publish status filters
    if (showUnpublished && showPublished) {
      // Both checked: show all products
      return matchesSearch && matchesCategory;
    } else if (showUnpublished) {
      // Only unpublished checked: show only inactive
      return matchesSearch && matchesCategory && product.isActive === false;
    } else if (showPublished) {
      // Only published checked: show only active
      return matchesSearch && matchesCategory && product.isActive === true;
    }
    
    // Neither checked: show all products
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Product Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your grocery products and inventory
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Product
          </Button>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showUnpublished}
                      onChange={(e) => setShowUnpublished(e.target.checked)}
                      sx={{
                        color: 'error.main',
                        '&.Mui-checked': {
                          color: 'error.main',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontWeight: showUnpublished ? 'bold' : 'normal' }}>
                      Unpublished
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showPublished}
                      onChange={(e) => setShowPublished(e.target.checked)}
                      sx={{
                        color: 'success.main',
                        '&.Mui-checked': {
                          color: 'success.main',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontWeight: showPublished ? 'bold' : 'normal' }}>
                      Published
                    </Typography>
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Clear All Filters Button - Optional */}
        {(searchTerm || selectedCategory || showUnpublished || showPublished) && (
          <Box sx={{ mb: 2 }}>
            <Button
              size="small"
              variant="text"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setShowUnpublished(false);
                setShowPublished(false);
              }}
            >
              Clear All Filters
            </Button>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Products Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Featured</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Avatar
                      src={product.imageUrl || 'https://via.placeholder.com/50'}
                      alt={product.name}
                      sx={{ width: 50, height: 50 }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/50?text=' + product.name.charAt(0);
                      }}
                    >
                      {product.name.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                      {product.isActive === false && (
                        <Chip
                          label="UNPUBLISHED"
                          size="small"
                          color="error"
                          sx={{ mt: 0.5, fontWeight: 'bold' }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.category?.name || 'No Category'}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Rs. {product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      per {product.unit}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${product.stockQuantity || 0} ${product.unit || 'units'}`}
                      size="small"
                      color={product.stockQuantity > 10 ? 'success' : product.stockQuantity > 0 ? 'warning' : 'error'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.isFeatured ? 'Yes' : 'No'}
                      size="small"
                      color={product.isFeatured ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(product)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(product.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredProducts.length === 0 && (
          <Box textAlign="center" sx={{ py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria or add a new product
            </Typography>
          </Box>
        )}

        {/* Add/Edit Product Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      label="Category"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Stock Quantity"
                    name="stockQuantity"
                    type="number"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    placeholder="kg, pieces, etc."
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Product Image
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ mb: 1 }}
                      >
                        Upload Image File
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </Button>
                      <Typography variant="caption" display="block" gutterBottom>
                        OR enter image URL below
                      </Typography>
                      <TextField
                        fullWidth
                        label="Image URL"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) => {
                          handleInputChange(e);
                          setImagePreview(e.target.value);
                        }}
                        placeholder="https://example.com/image.jpg"
                        size="small"
                      />
                    </Box>
                    {imagePreview && (
                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="caption" display="block" gutterBottom>
                          Image Preview:
                        </Typography>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '200px',
                            objectFit: 'contain',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            padding: '8px',
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <label>
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleInputChange}
                      />
                      Featured Product
                    </label>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" variant="contained">
                {editingProduct ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Container>
  );
}

export default ProductManagement;










