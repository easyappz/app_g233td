import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Paper, Alert, Link, Snackbar } from '@mui/material';
import { instance } from '../api/axios';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const navigate = useNavigate();

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
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(true);
      setSnackbar({
        open: true,
        message: 'Регистрация успешна! Вы будете перенаправлены на страницу входа.',
        severity: 'success',
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Ошибка при регистрации';
      setError(errorMessage);
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#1877F2' }}>
          Регистрация
        </Typography>
        {error && !snackbar.open && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>
        )}
        {success && !snackbar.open ? (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            Регистрация успешна! Теперь вы можете войти.
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Имя"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ backgroundColor: '#f5f6f7', borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Имя пользователя"
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{ backgroundColor: '#f5f6f7', borderRadius: 1 }}
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
              sx={{ backgroundColor: '#f5f6f7', borderRadius: 1 }}
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
              sx={{ backgroundColor: '#f5f6f7', borderRadius: 1 }}
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
              sx={{ backgroundColor: '#f5f6f7', borderRadius: 1 }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2, backgroundColor: '#1877F2', '&:hover': { backgroundColor: '#166FE5' } }}>
              Зарегистрироваться
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#1d2129' }}>
                Уже есть аккаунт? <Link component="button" onClick={handleNavigateToLogin} sx={{ color: '#1877F2', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Войти</Link>
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default RegisterPage;
