import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link

function LoginPage({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(); // Simula el login
  };

  return (
    <div className="form-container sign-in">
      <form onSubmit={handleSubmit}>
        <img src="img/lienzo-logo.png" alt="Lienzo Logo" className="logo" />
        <h1>Iniciar Sesión</h1>
        <div className="social-icons">
          <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" className="icon"><i className="fa-brands fa-instagram"></i></a>
        </div>
        <span>o usa tu email y contraseña</span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>

      {/* Enlace para redirigir a otra página */}
      <div className="redirect">
        <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
