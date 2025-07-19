import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import FeedPage from './pages/FeedPage';
import SearchPage from './pages/SearchPage';
import SearchUsersPage from './pages/SearchUsersPage';
import UserProfilePage from './pages/UserProfilePage';
import DialogsPage from './pages/DialogsPage';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="feed" element={<FeedPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="search-users" element={<SearchUsersPage />} />
              <Route path="user/:id" element={<UserProfilePage />} />
              <Route path="dialogs" element={<DialogsPage />} />
              <Route path="*" element={<div>Страница не найдена</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
