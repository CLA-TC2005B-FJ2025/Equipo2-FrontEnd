import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Usamos useNavigate para redirigir

function LoginPage({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para mostrar el error si no se encuentra el usuario
  const navigate = useNavigate(); // Usamos navigate para redirigir al usuario a otra página después del login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Leemos el archivo users.json
    try {
      const response = await fetch('/users.json');
      const users = await response.json();

      // Buscar el usuario en el archivo JSON
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        handleLogin(); // Simula el login
        navigate('/game'); // Redirige a la página del juego después de iniciar sesión
      } else {
        setErrorMessage('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al leer el archivo de usuarios:', error);
    }
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
        <button type="submit">Iniciar sesión</button>
      </form>

      {/* Mostrar mensaje de error si las credenciales son incorrectas */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Enlace para redirigir a la página de registro */}
      <div className="redirect">
        <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
