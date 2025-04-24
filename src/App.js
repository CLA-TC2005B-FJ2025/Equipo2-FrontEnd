import React, { useState } from 'react';
import './style.css';
import { Routes, Route, Navigate } from 'react-router-dom'; // Usamos Routes y Route
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import GamePage from './components/GamePage'; // Página del juego

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Simula el inicio de sesión
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Simula el cierre de sesión
  };

  return (
    <div>
      <Routes>
        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={
          <div className={`container ${isSignUp ? 'active' : ''}`}>
            {isSignUp ? (
              <RegisterPage handleLogin={handleLogin} />
            ) : (
              <LoginPage handleLogin={handleLogin} />
            )}
            <div className="toggle-container">
              <div className="toggle">
                <div className="toggle-panel toggle-left">
                  <h1>¡Bienvenido de nuevo!</h1>
                  <p>Introduce tu información para iniciar sesión</p>
                  <button onClick={toggleForm}>Inicia sesión</button>
                </div>
                <div className="toggle-panel toggle-right">
                  <h1>¡Hola, Jugador!</h1>
                  <p>Introduce tu información para registrarte</p>
                  <button onClick={toggleForm}>Regístrate</button>
                </div>
              </div>
            </div>
          </div>
        } />

        {/* Ruta para la página del juego */}
        <Route path="/game" element={
          isLoggedIn ? (
            <GamePage handleLogout={handleLogout} />
          ) : (
            <Navigate to="/login" /> // Redirige a login si no está logueado
          )
        } />

        {/* Redirige a login si no existe la ruta */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
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