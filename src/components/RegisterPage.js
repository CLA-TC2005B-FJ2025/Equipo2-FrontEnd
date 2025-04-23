import React from 'react';

function RegisterPage() {
  return (
    <div className="form-container sign-up">
      <form>
        <img src="img/lienzo-logo.png" alt="Lienzo Logo" className="logo" />
        <h1>Crea una cuenta</h1>
        <div className="social-icons">
          <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" className="icon"><i className="fa-brands fa-instagram"></i></a>
        </div>
        <span>o usa tu email para registrarte</span>
        <input type="text" placeholder="Nombre" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Regístrate</button>
      </form>
    </div>
  );
}

export default RegisterPage;
