import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { keyframes } from '@mui/system';
import ProductContainer from './ProductContainer'; // Ensure the path is correct

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

function Home({ onSearch }) {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/courses'); // Redirect to the courses page
  };

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url("https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          padding: 3,
          animation: `${fadeIn} 2s ease-in-out`,
          position: 'relative',
        }}
      >
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Welcome to our furniture store
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Let us help you stay in comfort
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ padding: '10px 20px', fontSize: '1.2rem', borderRadius: '50px' }}
          onClick={handleGetStartedClick}
        >
          Get Started
        </Button>
      </Box>

      {/* Product Container Section */}
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" component="h2" sx={{ marginBottom: 2 }}>
          Featured Products
        </Typography>
        <ProductContainer />
      </Box>

      {/* Testimonials Section */}
      {/* Add content for Testimonials here */}
    </div>
  );
}

export default Home;
