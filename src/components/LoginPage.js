import React, { useState } from 'react';

function LoginPage({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí debes validar la información y simular login
    handleLogin(); // Llama a la función de login para cambiar el estado
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
    </div>
  );
}

export default LoginPage;
