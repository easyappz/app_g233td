import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4">
          Добро пожаловать в Социальную Сеть
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Вы успешно вошли в систему!
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
