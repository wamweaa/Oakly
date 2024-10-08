import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { keyframes } from '@mui/system';
import Footer from './Footer';
import Testimonials from './Testimonials';


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
    navigate('/product-container'); // Redirect to the courses page
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
          Shop With Us!!
        </Button>
      </Box>
      <Testimonials/>
      <Footer/>
    </div>
  );
}

export default Home;
