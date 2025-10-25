import React from 'react';
import { Box, Card, CardContent, Skeleton, Grid } from '@mui/material';

export function ProductCardSkeleton() {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      {/* Image Skeleton */}
      <Skeleton 
        variant="rectangular" 
        height={220} 
        animation="wave"
        sx={{ bgcolor: 'grey.200' }}
      />
      
      {/* Content Skeleton */}
      <CardContent sx={{ p: 2 }}>
        {/* Category */}
        <Skeleton 
          variant="text" 
          width="40%" 
          height={16} 
          sx={{ mb: 1 }} 
          animation="wave"
        />
        
        {/* Product Name */}
        <Skeleton 
          variant="text" 
          width="90%" 
          height={28} 
          sx={{ mb: 1 }} 
          animation="wave"
        />
        <Skeleton 
          variant="text" 
          width="70%" 
          height={28} 
          animation="wave"
        />
        
        {/* Description */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <Skeleton 
            variant="text" 
            width="100%" 
            height={16} 
            animation="wave"
          />
          <Skeleton 
            variant="text" 
            width="85%" 
            height={16} 
            animation="wave"
          />
        </Box>
        
        {/* Price */}
        <Skeleton 
          variant="text" 
          width="50%" 
          height={36} 
          animation="wave"
        />
        
        {/* Button */}
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={42} 
          sx={{ mt: 2, borderRadius: 2 }} 
          animation="wave"
        />
      </CardContent>
    </Card>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ProductCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductCardSkeleton;
