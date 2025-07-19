import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './Navbar';

function Layout() {
  return (
    <Box>
      <Navbar />
      <Box component="main" sx={{ mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
