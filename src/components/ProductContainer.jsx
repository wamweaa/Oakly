import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, Container, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Card component to ensure uniform size
const StyledCard = styled(Card)({
  maxWidth: 345,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

const TruncatedDescription = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
});

const StyledCardMedia = styled(CardMedia)({
  height: 180, // Adjusted height
  objectFit: 'cover', 
  width: '100%', // Ensure full width
});

function ProductContainer() {
  const { itemId } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [itemId]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products?item_id=${itemId}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  const generateWhatsAppLink = (product) => {
    const phoneNumber = '+254703825843';
    const message = `Hi, I'm interested in the following product:\n\nProduct: ${product.name}\nDescription: ${product.description}\nPrice: $${product.price}\n\nImage: http://localhost:5000/uploads/${product.image_url}`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <Container>
      {!selectedProduct ? (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <StyledCard onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
                {product.image_url && (
                  <StyledCardMedia
                    component="img"
                    image={product.image_url.startsWith('http') ? product.image_url : `http://localhost:5000${product.image_url}`}
                    alt={product.name}
                  />
                )}
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <TruncatedDescription variant="body2" color="text.secondary">
                    {product.description}
                  </TruncatedDescription>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" padding={4}>
          {selectedProduct.image_url && (
            <CardMedia
              component="img"
              height="400"
              image={selectedProduct.image_url.startsWith('http') ? selectedProduct.image_url : `http://localhost:5000${selectedProduct.image_url}`}
              alt={selectedProduct.name}
              style={{ objectFit: 'cover' }} // Ensure image fits well
            />
          )}
          <Typography variant="h4" style={{ marginTop: '20px' }}>
            {selectedProduct.name}
          </Typography>
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            {selectedProduct.description}
          </Typography>
          <Typography variant="h6" style={{ marginTop: '10px', color: '#f50057' }}>
            ${selectedProduct.price}
          </Typography>
          <Button
            variant="contained"
            color="success"
            href={generateWhatsAppLink(selectedProduct)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: '20px' }}
          >
            Contact on WhatsApp
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBackToProducts}
            style={{ marginTop: '10px' }}
          >
            Back to Products
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default ProductContainer;
