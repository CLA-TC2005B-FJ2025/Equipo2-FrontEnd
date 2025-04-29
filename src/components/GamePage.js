import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Header from './Header';
import HowToPlay from './HowToPlay';
import Leaderboard from './Leaderboard';
import Footer from './Footer';
import GuessModal from './GuessModal';

import '../style.css';
import './GamePage.css';

const socket = io();

export default function GamePage({ onLogout }) {
  const [matrix, setMatrix] = useState([]);
  const [revealedSet, setRevealedSet] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [currentCell, setCurrentCell] = useState({ row: null, col: null });
  const [showGuess, setShowGuess] = useState(false);

  useEffect(() => {
    fetchMatrix();
    socket.on('pixel_revealed', handlePixelRevealed);
    return () => socket.off('pixel_revealed', handlePixelRevealed);
  }, []);

  async function fetchMatrix() {
    const res = await fetch('/matrix');
    const data = await res.json();
    setMatrix(data);
  }

  function handlePixelRevealed({ row, col }) {
    setRevealedSet(prev => new Set(prev).add(`${row}-${col}`));
    playBeep();
  }

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

  async function onCellClick(r, c) {
    setCurrentCell({ row: r, col: c });
    const res = await fetch(`/questions/${r}/${c}`);
    const qData = await res.json();
    if (qData.error) return alert(qData.error);
    setQuestionData(qData);
    setSelectedOption('');
    setShowModal(true);
  }

  function handleSubmit() {
    if (!selectedOption) return alert('Selecciona una opción');
    if (selectedOption === questionData.correctOption) {
      socket.emit('reveal_pixel', currentCell);
    } else {
      alert('Respuesta incorrecta');
    }
    setShowModal(false);
  }

  const handleGuessSubmit = txt => {
    alert(`Tu conjetura: “${txt}”`);
    setShowGuess(false);
  };

  const rows = matrix.length;
  const cols = rows ? matrix[0].length : 0;

  return (
    <div className="page-wrapper">
      <Header onLogout={onLogout} />
      <HowToPlay />

      <main className="game-container">
        <section className="card grid-card">
          <h2 className="card-title">Elige un píxel</h2>

          <div className="grid-area">
            <img
              id="result-image"
              src={`/uploads/result.png?t=${Date.now()}`}
              alt="Resultado"
            />
            <div
              className="grid-overlay"
              style={{
                gridTemplateRows:    `repeat(${rows}, 1fr)`,
                gridTemplateColumns: `repeat(${cols}, 1fr)`
              }}
            >
              {matrix.flatMap((rowArr, i) =>
                rowArr.map((val, j) => {
                  const key = `${i}-${j}`;
                  const isActive   = val === 1 && !revealedSet.has(key);
                  const isRevealed = revealedSet.has(key);
                  return (
                    <div
                      key={key}
                      className={`cell 
                        ${isActive   ? 'cell--active'   : ''} 
                        ${isRevealed ? 'cell--revealed' : ''}`}
                      onClick={() => isActive && onCellClick(i, j)}
                    />
                  );
                })
              )}
            </div>
          </div>

          <button 
            className="btn btn-guess" 
            onClick={() => setShowGuess(true)}
          >
            Adivinar imagen
          </button>
        </section>

        <Leaderboard />
      </main>

      <Footer />

      {showModal && questionData && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{questionData.question}</h2>
            <form>
              {questionData.options.map((opt, idx) => {
                const code = String.fromCharCode(97 + idx);
                return (
                  <label key={code} className="option-label">
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
            <button className="btn btn-submit" onClick={handleSubmit}>
              Responder
            </button>
          </div>
        </div>
      )}

      <GuessModal
        isOpen={showGuess}
        onClose={() => setShowGuess(false)}
        onSubmit={handleGuessSubmit}
      />
    </div>
  );
}
