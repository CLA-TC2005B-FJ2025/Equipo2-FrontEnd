import React, { useState } from 'react';
import Header from './Header'; // Asegúrate de tener el componente Header
import Footer from './Footer'; // Asegúrate de tener el componente Footer

function GamePage({ handleLogout }) {
  const [ticketCount, setTicketCount] = useState(0); // Contador de boletos

  // Función para aumentar el contador de boletos
  const incrementTicket = () => {
    setTicketCount(ticketCount + 1);
  };

  return (
    <div>
      <Header /> {/* Incluimos el Header */}
      
      {/* ================================
        HERO PIXEL
        ================================ */}
      <section className="hero-pixel">
        <h1>Pixel x Pixel</h1>
        <div className="plataformas">
          <img src="https://via.placeholder.com/80x30?text=Switch" alt="Switch" />
          <img src="https://via.placeholder.com/80x30?text=Steam" alt="Steam" />
          <img src="https://via.placeholder.com/80x30?text=Xbox" alt="Xbox" />
          <img src="https://via.placeholder.com/80x30?text=PS4" alt="PS4" />
        </div>
      </section>

      {/* ================================
        GRILLA DE PÍXELES
        ================================ */}
      <section className="grid-section">
        <h2>Elige un pixel</h2>

        {/* Contenedor de la imagen y los píxeles superpuestos */}
        <div className="image-container">
          <canvas id="imageCanvas" width="800" height="800"></canvas>

          {/* Capa de píxeles en posición absoluta */}
          <div className="pixel-grid" id="pixelGrid">
            {/* 16 píxeles (4x4). Ajusta a tu gusto. */}
            {Array.from({ length: 16 }).map((_, index) => (
              <div className="pixel" data-index={index} key={index}>
                ?
              </div>
            ))}
          </div>
        </div>

        <button className="btn-adivinar" id="guessButton" onClick={incrementTicket}>
          Adivina la imagen
        </button>

        {/* Contador de boletos B */}
        <div className="ticket-counter">
          Boletos B: <span id="ticketCount">{ticketCount}</span>
        </div>
      </section>

      {/* ================================
        FOOTER
        ================================ */}
      <Footer /> {/* Incluimos el Footer */}
    </div>
  );
}

export default GamePage;
