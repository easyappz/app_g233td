import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Alert } from '@mui/material';
import { instance } from '../api/axios';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await instance.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при входе');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Вход
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
        {success ? (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            Вход выполнен успешно! Добро пожаловать.
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Электронная почта"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Пароль"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Войти
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default LoginPage;
