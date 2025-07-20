import React from 'react';
import './App.css';
import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import ToastContainerWrapper from './components/ToastContainerWrapper';
import { AuthProvider } from './context/AuthContext';

/**
 * Main application component
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Layout />
          <ToastContainerWrapper />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
