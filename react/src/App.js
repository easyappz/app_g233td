import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ErrorBoundary from './ErrorBoundary';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import FeedPage from './pages/FeedPage';
import SearchPage from './pages/SearchPage';
import DialogsPage from './pages/DialogsPage';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1877F2',
    },
    secondary: {
      main: '#E7F3FF',
    },
    background: {
      default: '#F0F2F5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="user/:id" element={<UserProfilePage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="dialogs" element={<DialogsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
