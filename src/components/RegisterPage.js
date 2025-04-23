import React, { useState } from 'react';

function RegisterPage({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí debes manejar la lógica de registro
    handleLogin(); // Llama a la función de login para simular el registro
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
        <span>o usa tu email para registrarte</span>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Regístrate</button>
      </form>
    </div>
  );
}

export default RegisterPage;
