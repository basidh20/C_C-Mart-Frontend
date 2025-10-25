import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Divider,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import {
  Inventory,
  TrendingUp,
  AttachMoney,
  Clear,
  FilterList,
} from '@mui/icons-material';

function ProductFilters({
  // Filter values
  stockFilter,
  featuredFilter,
  priceRange,
  priceFilterType,
  quickPriceRanges,
  maxPrice,
  
  // Handlers
  onStockFilterChange,
  onFeaturedFilterChange,
  onPriceChange,
  onQuickPriceRange,
  onClearFilters,
  onPriceFilterTypeChange,
}) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <FilterList sx={{ mr: 1 }} />
          <Typography variant="h6">Filters</Typography>
        </Box>

        <Stack spacing={3}>
          {/* Stock Status Filter */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Inventory sx={{ mr: 1, fontSize: 18 }} />
              Stock Status
            </Typography>
            <ToggleButtonGroup
              value={stockFilter}
              exclusive
              onChange={(e, value) => value !== null && onStockFilterChange(value)}
              size="small"
              fullWidth
              orientation="vertical"
            >
              <ToggleButton value="all" sx={{ justifyContent: 'flex-start' }}>
                <Typography variant="body2">All Products</Typography>
              </ToggleButton>
              <ToggleButton value="in_stock" sx={{ justifyContent: 'flex-start' }}>
                <Typography variant="body2">In Stock (10+)</Typography>
              </ToggleButton>
              <ToggleButton value="low_stock" sx={{ justifyContent: 'flex-start' }}>
                <Typography variant="body2">Low Stock (1-10)</Typography>
              </ToggleButton>
              <ToggleButton value="out_of_stock" sx={{ justifyContent: 'flex-start' }}>
                <Typography variant="body2">Out of Stock</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Divider />

          {/* Featured Products Filter */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1, fontSize: 18 }} />
              Special Offers
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={featuredFilter}
                    onChange={(e) => onFeaturedFilterChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="Featured Products Only"
              />
            </FormGroup>
          </Box>

          <Divider />

          {/* Price Filter */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoney sx={{ mr: 1, fontSize: 18 }} />
              Price Range
            </Typography>
            
            {/* Price Filter Type Toggle */}
            <Box sx={{ mb: 2 }}>
              <ToggleButtonGroup
                value={priceFilterType}
                exclusive
                onChange={(e, value) => value !== null && onPriceFilterTypeChange(value)}
                size="small"
                fullWidth
              >
                <ToggleButton value="range">
                  <Typography variant="body2">Custom</Typography>
                </ToggleButton>
                <ToggleButton value="quick">
                  <Typography variant="body2">Quick</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {priceFilterType === 'range' ? (
              <Box>
                <Typography variant="body2" gutterBottom>
                  Rs. {priceRange[0]} - Rs. {priceRange[1]}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={onPriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={maxPrice}
                  step={10}
                  marks={[
                    { value: 0, label: 'Rs. 0' },
                    { value: maxPrice, label: `Rs. ${maxPrice}` }
                  ]}
                />
              </Box>
            ) : (
              <Stack spacing={1}>
                {quickPriceRanges.map((range, index) => (
                  <Button
                    key={index}
                    variant={priceRange[0] === range.value[0] && priceRange[1] === range.value[1] ? 'contained' : 'outlined'}
                    onClick={() => onQuickPriceRange(range.value)}
                    fullWidth
                    size="small"
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    {range.label}
                  </Button>
                ))}
              </Stack>
            )}
          </Box>

          <Divider />

          {/* Clear Filters */}
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={onClearFilters}
            fullWidth
            size="small"
          >
            Clear All Filters
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProductFilters;










