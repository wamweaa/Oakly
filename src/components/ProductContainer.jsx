import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, Container, Button } from '@mui/material';

function ProductContainer() {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchItems();
    fetchProducts();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const generateWhatsAppLink = (item, product) => {
    const phoneNumber = '+254703825843'; // Replace with your WhatsApp number
    const message = `Hi, I'm interested in the following item and product:\n\nItem: ${item.name}\nProduct: ${product.name}\nDescription: ${product.description}\nPrice: $${product.price}\n\nImage: http://localhost:5000/${product.image_url}`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {items.map((item) => (
          products
            .filter((product) => product.item_id === item.id)
            .map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card>
                  {product.image_url && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:5000/${product.image_url}`}
                      alt={product.name}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price}
                    </Typography>
                    {/* Add WhatsApp Button with pre-filled message */}
                    <Button 
                      variant="contained" 
                      color="success"
                      href={generateWhatsAppLink(item, product)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ marginTop: '10px' }}
                    >
                      Contact on WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
        ))}
      </Grid>
    </Container>
  );
}

export default ProductContainer;
