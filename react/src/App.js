import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/" element={
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h1>Добро пожаловать в социальную сеть</h1>
              <p>Перейдите на страницу профиля для просмотра или редактирования.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
