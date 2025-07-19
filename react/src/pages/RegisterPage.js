import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Alert } from '@mui/material';
import { instance } from '../api/axios';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      await instance.post('/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при регистрации');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Регистрация
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
        {success ? (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            Регистрация успешна! Теперь вы можете войти.
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Имя пользователя"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
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
            <TextField
              margin="normal"
              required
              fullWidth
              label="Подтвердите пароль"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Зарегистрироваться
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default RegisterPage;
