import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from '@mui/material';
import { Home, Person, Search, Message } from '@mui/icons-material';

function Navbar() {
  return (
    <AppBar position="fixed" color="primary" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}>
          СоцСеть
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton color="inherit" component={Link} to="/feed" title="Лента">
            <Home />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/profile" title="Профиль">
            <Person />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/search" title="Поиск">
            <Search />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/dialogs" title="Сообщения">
            <Message />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/profile">
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
