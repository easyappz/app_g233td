import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            Социальная сеть
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/feed">
                Лента
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Профиль
              </Button>
              <Button color="inherit" component={Link} to="/dialogs">
                Диалоги
              </Button>
              <Button color="inherit" component={Link} to="/search-users">
                Поиск
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Выйти
              </Button>
              <Typography variant="body1" sx={{ alignSelf: 'center', color: 'white' }}>
                {currentUser?.username || 'Пользователь'}
              </Typography>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Войти
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Регистрация
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
