import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Paper, Alert, Link } from '@mui/material';
import { instance } from '../api/axios';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await instance.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      
      if (response.data.token && response.data.user) {
        login(response.data.user, response.data.token);
        setSuccess(true);
      } else {
        setError('Ошибка при входе: данные пользователя или токен отсутствуют');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при входе');
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#1877F2' }}>
          Вход
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            Вход выполнен успешно! Добро пожаловать.
          </Alert>
        )}
        {!success && (
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
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2, backgroundColor: '#1877F2', '&:hover': { backgroundColor: '#166FE5' } }}>
              Войти
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#1d2129' }}>
                Нет аккаунта? <Link component="button" onClick={handleNavigateToRegister} sx={{ color: '#1877F2', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Зарегистрироваться</Link>
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default LoginPage;
