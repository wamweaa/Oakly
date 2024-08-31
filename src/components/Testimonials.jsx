import React from 'react';
import { Typography, Box, Card, CardContent, Avatar, Grid } from '@mui/material';

const testimonialsData = [
  {
    name: 'Jane Doe',
    message: 'This service is amazing! I had a wonderful experience.',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    designation: 'CEO, Example Inc.'
  },
  {
    name: 'John Smith',
    message: 'Great support and fast service. Highly recommend to everyone!',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    designation: 'CTO, Tech Solutions'
  },
  {
    name: 'Emily Johnson',
    message: 'Exceptional quality and customer service. Will definitely come back.',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    designation: 'Designer, Creative Co.'
  }
];

function Testimonials() {
  return (
    <Box mt={5} mb={5}>
      <Typography variant="h4" align="center" gutterBottom>
        What Our Clients Say
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonialsData.map((testimonial, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar src={testimonial.avatarUrl} alt={testimonial.name} sx={{ width: 80, height: 80, mb: 2 }} />
                  <Typography variant="h6" align="center">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center">
                    {testimonial.designation}
                  </Typography>
                  <Typography variant="body1" align="center" mt={2}>
                    "{testimonial.message}"
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Testimonials;
