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
              ? <GamePage onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />

        {/* DEFAULT REDIRECT */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </AuthProvider>
  );
}

export default App;

//import React from 'react';
//import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
//import LoginPage from './components/LoginPage';
//import MenuPage from './components/MenuPage';
//import { AuthProvider } from './contexts/AuthContext';
//import PrivateRoute from './components/PrivateRoute';
//import ListaPersonajes from './components/ListaPersonajes';
//import CrearPersonaje from './components/CrearPersonaje';
//import ActualizarPersonaje from './components/ActualizarPersonaje';
//import EliminarPersonaje from './components/EliminarPersonaje';
//
//function App() {
//  return (
//    <Router>
//      <AuthProvider>
//        <Routes>
//          <Route path="/login" element={<LoginPage />} />
//          <Route path="/menu" element={<PrivateRoute><MenuPage /></PrivateRoute>} />
//          <Route path="/listapersonajes" element={<PrivateRoute><ListaPersonajes /></PrivateRoute>} />
//          <Route path="/crearpersonaje" element={<PrivateRoute><CrearPersonaje /></PrivateRoute>} />
//          <Route path="/actualizarpersonaje" element={<PrivateRoute><ActualizarPersonaje /></PrivateRoute>} />
//          <Route path="/eliminarpersonaje" element={<PrivateRoute><EliminarPersonaje /></PrivateRoute>} />
//          <Route path="/" element={<Navigate to="/login" />} />
//        </Routes>
//      </AuthProvider>
//    </Router>
//  );
//}
//
//export default App;
//