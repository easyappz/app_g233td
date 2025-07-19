import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', maxWidth: '1200px', mx: 'auto' }}>
        <Outlet />
      </Box>
      <Box component="footer" sx={{ p: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        Социальная сеть © {new Date().getFullYear()}
      </Box>
    </Box>
  );
};

export default Layout;
