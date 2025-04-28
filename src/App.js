import React, { useState } from 'react';
import './style.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
+ import GamePage   from './components/GamePage';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isSignUp, setIsSignUp]     = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm   = ()  => setIsSignUp(prev => !prev);
  const handleLogin  = ()  => setIsLoggedIn(true);
  const handleLogout = ()  => setIsLoggedIn(false);

  return (
    <AuthProvider>
      <Routes>

        {/* LOGIN / REGISTER */}
        <Route path="/login" element={/* ... tu wrapper ... */} />

        {/* --- NUEVA RUTA DEL JUEGO --- */}
        <Route
          path="/game"
          element={
            isLoggedIn
              ? <GamePage />
              : <Navigate to="/login" replace />
          }
        />

        {/* REDIRECCIÓN POR DEFECTO */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;
