import React from 'react';

function Header() {
  return (
    <header>
      <div className="logo">
        <img src="/lienzo-logo.png" alt="Logo Lienzo" />
      </div>
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/pixelxpixel">Pixel x Pixel</a></li>
          <li><a href="/login">Registrarse / Iniciar Sesión</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
