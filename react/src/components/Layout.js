import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import FeedPage from '../pages/FeedPage';
import DialogsPage from '../pages/DialogsPage';
import SearchPage from '../pages/SearchPage';
import SearchUsersPage from '../pages/SearchUsersPage';
import UserProfilePage from '../pages/UserProfilePage';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', maxWidth: '1200px', mx: 'auto' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/dialogs" element={<DialogsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search-users" element={<SearchUsersPage />} />
          <Route path="/user/:id" element={<UserProfilePage />} />
        </Routes>
        <Outlet />
      </Box>
      <Box component="footer" sx={{ p: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        Социальная сеть © {new Date().getFullYear()}
      </Box>
    </Box>
  );
};

export default Layout;
