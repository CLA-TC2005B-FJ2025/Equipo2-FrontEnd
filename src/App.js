// src/App.js
import React, { useState } from 'react';
import './style.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import GamePage from './components/GamePage';
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
        <Route
          path="/login"
          element={
            <div className="login-wrapper">
              <div className={`container ${isSignUp ? 'active' : ''}`}>

                {/* SIGN IN FORM */}
                <div className="form-container sign-in">
                  <LoginPage onLogin={handleLogin} />
                </div>

                {/* SIGN UP FORM */}
                <div className="form-container sign-up">
                  <RegisterPage onSignUp={handleLogin} />
                </div>

                {/* TOGGLE PANELS */}
                <div className="toggle-container">
                  <div className="toggle">

                    <div className="toggle-panel toggle-left">
                      <h1>¡Hola, amigo!</h1>
                      <p>Regístrate para descubrir nuestra aplicación</p>
                      <button className="btn-toggle" onClick={toggleForm}>
                        Regístrate
                      </button>
                    </div>

                    <div className="toggle-panel toggle-right">
                      <h1>¡Bienvenido de nuevo!</h1>
                      <p>Introduce tus datos para iniciar sesión</p>
                      <button className="btn-toggle" onClick={toggleForm}>
                        Iniciar Sesión
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          }
        />

        {/* PROTECTED GAME */}
        <Route
          path="/game"
          element={
            isLoggedIn
              ? <GamePage handleLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />

        {/* PROTECTED GAME */}
        <Route
          path="/termino"
          element={
            <div>Lienzo</div>
          }
        />

        {/* DEFAULT REDIRECT */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;
