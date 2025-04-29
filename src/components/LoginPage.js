// src/components/LoginPage.js

// src/components/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import useLogin from '../hook/useLogin';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);      // tu login normal
  const { handleFacebookLogin } = useLogin();      // nuevo: login con FB

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  // Login convencional
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      onLogin();
      navigate('/game', { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  // Login con Facebook
  const handleFB = async () => {
    const ok = await handleFacebookLogin();
    if (ok) {
      onLogin();
      navigate('/game', { replace: true });
    } else {
      alert('No se pudo iniciar sesión con Facebook');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      <hr style={{ margin: '1.5rem 0' }} />

      <button
        type="button"
        onClick={handleFB}
        style={{
          display: 'block',
          width: '100%',
          padding: '.75rem',
          background: '#4267B2',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Iniciar sesión con Facebook
      </button>
    </div>
  );
}


//import React, { useState, useContext } from 'react';
//import { useNavigate } from 'react-router-dom';
//import { AuthContext } from '../contexts/AuthContext';
//
//
//export default function LoginPage({ onLogin }) {
//  const { login } = useContext(AuthContext);
//  const [email, setEmail]       = useState('');
//  const [password, setPassword] = useState('');
//  const navigate = useNavigate();    // <-- hook de navegación
//
//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    try {
//      await login(email, password);  // valida contra users.json
//      onLogin();                     // setIsLoggedIn(true)
//      navigate('/game', { replace: true }); // <-- redirige a /game
//    } catch (err) {
//      alert(err.message);
//    }
//  };
//
//  return (
//    <form onSubmit={handleSubmit}>
//      <h1>Iniciar Sesión</h1>
//      <input
//        type="email"
//        placeholder="Correo electrónico"
//        value={email}
//        onChange={e => setEmail(e.target.value)}
//        required
//      />
//      <input
//        type="password"
//        placeholder="Contraseña"
//        value={password}
//        onChange={e => setPassword(e.target.value)}
//        required
//      />
//      <button type="submit">Entrar</button>
//    </form>
//  );
//}
//