// src/sections/@dashboard/about.js

import React from 'react';
import { Container, Typography } from '@mui/material';

const About = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        Welcome to our about page! Here you can learn more about our company or organization.
      </Typography>
    </Container>
  );
};

export default About;
