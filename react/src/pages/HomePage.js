import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)',
        bgcolor: 'background.default',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Добро пожаловать в СоцСеть
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
        Общайтесь с друзьями, делитесь моментами своей жизни и находите новых знакомых.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" size="large" component={Link} to="/login">
          Войти
        </Button>
        <Button variant="outlined" color="primary" size="large" component={Link} to="/register">
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;
