import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, Container, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 300, // Reduced size
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[5],
  },
}));

const TruncatedDescription = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  marginBottom: '10px',
});

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200, // Reduced height
  objectFit: 'cover',
  width: '100%',
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 300,
  width: '100%',
  objectFit: 'cover',
  borderRadius: '10px',
  [theme.breakpoints.down('md')]: {
    height: 250,
  },
  [theme.breakpoints.down('sm')]: {
    height: 200,
  },
  [theme.breakpoints.down('xs')]: {
    height: 150,
  },
}));

const ProductDetails = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingLeft: theme.spacing(2),
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '& > *': {
    marginBottom: theme.spacing(2),
  },
}));

const ContainerWrapper = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontSize: '1rem',
  padding: theme.spacing(1, 3),
  textTransform: 'none',
}));

function ProductContainer() {
  const { itemId } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      fetchRelatedProducts(selectedProduct.category, selectedProduct.id);
    }
  }, [selectedProduct]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://oakly-backend-1.onrender.com/products');
      setProducts(response.data);

      const product = response.data.find(p => p.id === parseInt(itemId));
      setSelectedProduct(product || null);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchRelatedProducts = async (category, excludedProductId) => {
    try {
      const response = await axios.get(`https://oakly-backend-1.onrender.com/products?category=${category}`);
      const filteredProducts = response.data.filter(product => product.id !== excludedProductId);
      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setRelatedProducts([]);
  };

  const generateWhatsAppLink = (product) => {
    const phoneNumber = '+254703825843';
    const message = `Hi, I'm interested in the following product:\n\nProduct: ${product.name}\nDescription: ${product.description}\nPrice: KSH ${product.price}\n\nImage: http://localhost:5000/uploads/${product.image_url}`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const generatePhoneLink = (phoneNumber) => {
    return `tel:${phoneNumber}`;
  };

  return (
    <ContainerWrapper>
      {!selectedProduct ? (
        <Grid container spacing={4} wrap="wrap">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <StyledCard onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
                {product.image_url && (
                  <StyledCardMedia
                    component="img"
                    image={product.image_url.startsWith('http') ? product.image_url : `https://oakly-backend-1.onrender.com${product.image_url}`}
                    alt={product.name}
                  />
                )}
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>{product.name}</Typography>
                  <TruncatedDescription variant="body2" color="text.secondary">
                    {product.description}
                  </TruncatedDescription>
                  <Typography variant="body2" color="text.secondary">
                    KSH: {product.price}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" padding={2}>
          {selectedProduct.image_url && (
            <ProductImage
              component="img"
              image={selectedProduct.image_url.startsWith('http') ? selectedProduct.image_url : `https://oakly-backend-1.onrender.com${selectedProduct.image_url}`}
              alt={selectedProduct.name}
            />
          )}
          <ProductDetails>
            <Typography variant="h4" gutterBottom>{selectedProduct.name}</Typography>
            <Typography variant="body1">
              {selectedProduct.description}
            </Typography>
            <Typography variant="h6" style={{ color: '#f50057' }}>
              KSH: {selectedProduct.price}
            </Typography>
            <StyledButton
              variant="contained"
              color="success"
              href={generateWhatsAppLink(selectedProduct)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact on WhatsApp
            </StyledButton>
            <StyledButton
              variant="contained"
              color="primary"
              href={generatePhoneLink('+254703825843')}
              style={{ marginTop: '10px' }}
            >
              Call Now
            </StyledButton>
            <StyledButton
              variant="outlined"
              color="primary"
              onClick={handleBackToProducts}
              style={{ marginTop: '10px' }}
            >
              Back to Products
            </StyledButton>
          </ProductDetails>
        </Box>
      )}

      {selectedProduct && relatedProducts.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" mb={2}>Related Products</Typography>
          <Grid container spacing={4} wrap="wrap">
            {relatedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <StyledCard onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
                  {product.image_url && (
                    <StyledCardMedia
                      component="img"
                      image={product.image_url.startsWith('http') ? product.image_url : `https://oakly-backend-1.onrender.com${product.image_url}`}
                      alt={product.name}
                    />
                  )}
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>{product.name}</Typography>
                    <TruncatedDescription variant="body2" color="text.secondary">
                      {product.description}
                    </TruncatedDescription>
                    <Typography variant="body2" color="text.secondary">
                      KSH: {product.price}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </ContainerWrapper>
  );
}

export default ProductContainer;
