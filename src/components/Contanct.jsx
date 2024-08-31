import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Handle form submission (e.g., send data to backend)
      const emailData = {
        to: 'patokinya12@gmail.com',
        subject: 'New Contact Form Submission',
        body: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
      };

      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      console.log('Email sent successfully:', emailData);

      console.log('Form data submitted:', formData);

      // Set formSubmitted to true to show a success message
      setFormSubmitted(true);

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} bgcolor="background.paper" boxShadow={3} borderRadius={2}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contact Us
        </Typography>
        {formSubmitted ? (
          <Typography variant="body1">Thank you for your message! We will get back to you shortly.</Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Message"
                id="message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Box>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        )}
      </Box>
      <div>
      <h1>You can also reach to us through:</h1>
      <a href="tel:+254703825843"><h4>Contact: +254703825843</h4></a>
      </div>
    </Container>
  );
}

export default Contact;
