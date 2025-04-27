// src/components/RegisterPage.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function RegisterPage({ onSignUp }) {
  const { register } = useContext(AuthContext);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      onSignUp();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Regístrate</h1>
      <input
        type="text"
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
      <button type="submit">Crear Cuenta</button>
    </form>
  );
}
