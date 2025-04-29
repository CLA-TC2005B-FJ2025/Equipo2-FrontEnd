// src/components/GamePage.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Header from './Header';
import HowToPlay from './HowToPlay';
import Leaderboard from './Leaderboard';
import Footer from './Footer';

import '../style.css';
import './GamePage.css';

// Conecta automáticamente al servidor definido en el proxy de package.json
const socket = io();

function GamePage({ onLogout }) {
  const [matrix, setMatrix] = useState([]);
  const [revealedSet, setRevealedSet] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [currentCell, setCurrentCell] = useState({ row: null, col: null });

  // breve “beep”
  const playBeep = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 440;
    osc.start();
    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    setTimeout(() => osc.stop(), 200);
  };

  // Al montar: cargo matriz y suscribo al socket
  useEffect(() => {
    fetchMatrix();
    socket.on('pixel_revealed', handlePixelRevealed);
    return () => socket.off('pixel_revealed', handlePixelRevealed);
  }, []);

  // Trae la matriz de /matrix
  async function fetchMatrix() {
    const res = await fetch('/matrix');
    const data = await res.json();
    setMatrix(data);
  }

  // Cuando llega el evento, marco revelado y sueno
  function handlePixelRevealed({ row, col }) {
    setRevealedSet(prev => new Set(prev).add(`${row}-${col}`));
    playBeep();
  }

  // Click en celda activa → abro modal
  async function onCellClick(r, c) {
    setCurrentCell({ row: r, col: c });
    const res = await fetch(`/questions/${r}/${c}`);
    const qData = await res.json();
    if (qData.error) {
      alert(qData.error);
      return;
    }
    setQuestionData(qData);
    setSelectedOption('');
    setShowModal(true);
  }

  // Envío al servidor *solo* si la respuesta es correcta
  function handleSubmit() {
    if (!selectedOption) {
      alert('Selecciona una opción');
      return;
    }
    if (selectedOption === questionData.correctOption) {
      socket.emit('reveal_pixel', currentCell);
    } else {
      alert('Respuesta incorrecta');
    }
    setShowModal(false);
  }

  const rows = matrix.length;
  const cols = rows ? matrix[0].length : 0;

  return (
    <div>
      {/* Pasa onLogout al Header */}
      <Header onLogout={onLogout} />

      <HowToPlay />

      <div className="game-wrapper">
        <div className="game-main">
          <section className="hero-pixel">
            <h1>Pixel x Pixel</h1>
          </section>

          <section className="grid-section">
            <h2>Elige un píxel</h2>
            <div className="grid-container">
              <img
                id="result-image"
                src={`/uploads/result.png?t=${Date.now()}`}
                alt="Processed"
              />
              <div
                className="grid-overlay"
                style={{
                  gridTemplateRows:    `repeat(${rows}, 1fr)`,
                  gridTemplateColumns: `repeat(${cols}, 1fr)`
                }}
              >
                {matrix.map((rowArr, i) =>
                  rowArr.map((val, j) => {
                    const key = `${i}-${j}`;
                    const isActive   = val === 1 && !revealedSet.has(key);
                    const isRevealed = revealedSet.has(key);
                    return (
                      <div
                        key={key}
                        className={`cell${isActive ? ' active' : ''}${isRevealed ? ' revealed' : ''}`}
                        onClick={() => isActive && onCellClick(i, j)}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </section>
        </div>

        <Leaderboard />
      </div>

      <Footer />

      {/* Modal de pregunta */}
      {showModal && questionData && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{questionData.question}</h2>
            <form>
              {questionData.options.map((opt, idx) => {
                const code = String.fromCharCode(97 + idx);
                return (
                  <label key={code}>
                    <input
                      type="radio"
                      name="answer"
                      value={code}
                      checked={selectedOption === code}
                      onChange={() => setSelectedOption(code)}
                    />
                    {opt}
                  </label>
                );
              })}
            </form>
            <button onClick={handleSubmit}>Responder</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
