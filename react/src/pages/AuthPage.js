import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert, AlertTitle } from '@mui/material';
import { LockOutlined, PersonAdd } from '@mui/icons-material';
import { instance } from '../api/axios';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = location.pathname === '/register';

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Имя пользователя обязательно';
    if (!formData.email) newErrors.email = 'Email обязателен';
    if (!formData.password) newErrors.password = 'Пароль обязателен';
    if (isRegister && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setServerError('');
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegister 
        ? { username: formData.username, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const response = await instance.post(endpoint, payload);
      if (response.status === 200 || response.status === 201) {
        navigate(isRegister ? '/login' : '/home');
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'Произошла ошибка. Попробуйте позже.');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {isRegister ? <PersonAdd fontSize="large" /> : <LockOutlined fontSize="large" />}
        <Typography component="h1" variant="h5">
          {isRegister ? 'Регистрация' : 'Вход'}
        </Typography>
        {serverError && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            <AlertTitle>Ошибка</AlertTitle>
            {serverError}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Имя пользователя"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            disabled={!isRegister}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          {isRegister && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Подтвердите пароль"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {isRegister ? 'Зарегистрироваться' : 'Войти'}
          </Button>
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate(isRegister ? '/login' : '/register')}
            sx={{ mt: 1 }}
          >
            {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthPage;
