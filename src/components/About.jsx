import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';

const Section = styled(Box)({
  padding: '40px 20px',
  backgroundColor: '#f5f5f5',
  textAlign: 'center',
});

const Heading = styled(Typography)({
  marginBottom: '20px',
  fontWeight: 'bold',
  color: '#8B4513', // Wooden brown color
});

const Paragraph = styled(Typography)({
  marginBottom: '20px',
  color: '#333',
});

const Image = styled('img')({
  width: '100%',
  borderRadius: '8px',
});

function About() {
  return (
    <Section>
      <Container maxWidth="md">
        <Heading variant="h4">About Us</Heading>
        <Paragraph variant="body1">
          Welcome to our Furniture Store! We are dedicated to providing high-quality, stylish, and affordable furniture that transforms your house into a home. Our carefully curated collection includes a wide range of furniture pieces, from modern to classic designs, crafted to meet the needs of every taste and budget.
        </Paragraph>
        <Paragraph variant="body1">
          Our mission is to offer exceptional customer service and help you find the perfect furniture that fits your lifestyle. Whether you're looking to furnish your living room, bedroom, or office, we have something special for you. We believe in sustainability, quality craftsmanship, and creating spaces that inspire.
        </Paragraph>
        <Paragraph variant="body1">
          Thank you for choosing our Furniture Store. We look forward to being a part of your journey in creating beautiful, comfortable, and functional spaces.
        </Paragraph>

        <Grid container spacing={2} mt={4}>
          <Grid item xs={12} sm={6}>
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZETcjmEC6YNVyZwp5vwz_nMkRqQJKOqMpPQ&s" alt="Showroom" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Image src="https://imgs.search.brave.com/CCFRXL4E4Q1QROhLa8SXtO3Vf_3aESeZNFH7Za-BzwA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg2/NjI3NTUxL3Bob3Rv/L2Z1cm5pc2hlZC1s/aXZpbmctcm9vbS1p/bi1sdXh1cnktaG9t/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9d1UtcUg2dGVW/ZnlydTNLam9rWTND/VkNfSGhCZU40ZlBj/azFsTFFVSjNxdz0" alt="Craftsmanship" />
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}

export default About;
