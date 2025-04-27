import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function LoginPage({ handleLogin }) {
  const [correo, setCorreo]     = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔥 handleSubmit fired:', correo, password);  // <= aquí el log
    setErrorMessage('');
    const success = await login(correo, password);
    console.log('🔥 login result:', success);               // <= y este log
    if (success) {
      handleLogin();
      navigate('/game');
    } else {
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="form-container sign-in">
      <form onSubmit={handleSubmit}>
        {/* ... tu logo y título ... */}

        <span>o usa tu usuario y contraseña</span>
        <input
          type="text"
          placeholder="Usuario"
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

        {/* Botón ahora también dispara handleSubmit en onClick */}
        <button
          type="submit"
          onClick={handleSubmit}      // <= captura clicks que no pasen por onSubmit
        >
          Iniciar sesión
        </button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <div className="redirect">
        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
