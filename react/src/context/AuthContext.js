import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('currentUser');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        toast.error('Ошибка при загрузке данных пользователя. Пожалуйста, войдите снова.', {
          position: 'top-right',
          autoClose: 5000,
        });
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    try {
      setCurrentUser(userData);
      setToken(authToken);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      toast.success('Вход выполнен успешно!', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Ошибка при входе. Пожалуйста, попробуйте снова.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  const logout = () => {
    try {
      setCurrentUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      toast.info('Вы вышли из системы.', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Ошибка при выходе. Пожалуйста, попробуйте снова.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  const value = {
    currentUser,
    token,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
