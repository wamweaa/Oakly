import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { styled } from '@mui/system';

const FooterContainer = styled(Box)({
  backgroundColor: '#8B4513', // Wooden brown color
  color: '#fff',
  padding: '40px 20px',
  marginTop: 'auto',
});

const FooterHeading = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '20px',
});

const FooterLink = styled(Link)({
  color: '#fff',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '10px',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const SocialIcon = styled(IconButton)({
  color: '#fff',
  '&:hover': {
    color: '#f50057',
    transition: 'color 0.3s ease-in-out',
  },
});

function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <FooterHeading variant="h6">Furniture Store</FooterHeading>
            <Typography variant="body2">
              section 2,<br />
              Thika, kiambu, Kenya<br />
              Phone: +254 703 825843<br />
              Email: ruhiudennis@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FooterHeading variant="h6">Navigations</FooterHeading>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/product-container">Furnitures</FooterLink>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FooterHeading variant="h6">Follow Us</FooterHeading>
            <Box>
              <SocialIcon href="https://www.tiktok.com/@oaklyfurnitures">
                <FaTiktok />
              </SocialIcon>
              <SocialIcon href="https://www.twitter.com">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/oakly_furnitures.ke/">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com">
                <FaLinkedinIn />
              </SocialIcon>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">&copy; 2024 Furniture Store. All rights reserved.</Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
}

export default Footer;
