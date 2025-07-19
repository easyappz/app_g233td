import React from 'react';
import './App.css';
import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import ToastContainerWrapper from './components/ToastContainerWrapper';

/**
 * Main application component
 */
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
        <ToastContainerWrapper />
      </div>
    </BrowserRouter>
  );
}

export default App;
