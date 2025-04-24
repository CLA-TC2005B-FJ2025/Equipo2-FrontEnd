import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="logo">
        <img src="img/lienzo-logo.png" alt="Logo Lienzo" />
      </div>
      <nav>
        <ul>
          <li><Link to="/game">Juego</Link></li>
          <li><Link to="/howtoplay">¿Cómo jugar?</Link></li>
          <li><button onClick={() => {}}>Cerrar sesión</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
