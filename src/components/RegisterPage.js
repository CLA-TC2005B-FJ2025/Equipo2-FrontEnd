import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function RegisterPage({ handleLogin }) {
  const [correo, setCorreo]       = useState('');
  const [password, setPassword]   = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const ok = await register(correo, password);
    if (!ok) {
      setErrorMessage('No se pudo registrar. Quizá el usuario ya existe.');
      return;
    }

    // Auto-login tras registrarse
    const logged = await login(correo, password);
    if (logged) {
      handleLogin();
      navigate('/game');
    }
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleSubmit}>
        <img src="img/lienzo-logo.png" alt="Lienzo Logo" className="logo" />
        <h1>Crea una cuenta</h1>
        <div className="social-icons">
          <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" className="icon"><i className="fa-brands fa-instagram"></i></a>
        </div>
        <span>o usa tu usuario y contraseña</span>
        <input
          type="text"                      // <-- CAMBIO aquí
          placeholder="Usuario"            // <-- y aquí
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Regístrate</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default RegisterPage;
