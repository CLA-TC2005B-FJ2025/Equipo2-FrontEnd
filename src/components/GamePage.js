import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import HowToPlay from './HowToPlay';
import Leaderboard from './Leaderboard';

import '../style.css';          // tu CSS global
import './GamePage.css';        // layout específico

function GamePage({ handleLogout }) {
  const [ticketCount, setTicketCount] = useState(0);

  const incrementTicket = () => {
    setTicketCount(prev => prev + 1);
  };

  return (
    <div>
      <Header />
      <HowToPlay />

      {/* Flex container: juego a la izquierda, leaderboard a la derecha */}
      <div className="game-wrapper">
        <div className="game-main">
          <section className="hero-pixel">
            <h1>Pixel x Pixel</h1>
            <div className="plataformas">
              <img src="https://via.placeholder.com/80x30?text=Switch" alt="Switch" />
              <img src="https://via.placeholder.com/80x30?text=Steam" alt="Steam" />
              <img src="https://via.placeholder.com/80x30?text=Xbox" alt="Xbox" />
              <img src="https://via.placeholder.com/80x30?text=PS4" alt="PS4" />
            </div>
          </section>

          <section className="grid-section">
            <h2>Elige un pixel</h2>
            <div className="image-container">
              <canvas id="imageCanvas" width="800" height="800"></canvas>
              <div className="pixel-grid" id="pixelGrid">
                {Array.from({ length: 16 }).map((_, idx) => (
                  <div className="pixel" data-index={idx} key={idx}>?</div>
                ))}
              </div>
            </div>
            <button className="btn-adivinar" id="guessButton" onClick={incrementTicket}>
              Adivina la imagen
            </button>
            <div className="ticket-counter">
              Boletos B: <span id="ticketCount">{ticketCount}</span>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <Leaderboard />
      </div>

      <Footer />
    </div>
  );
}

export default GamePage;
