// src/components/GuessModal.js
import React, { useState } from 'react';
import './GuessModal.css';

export default function GuessModal({ isOpen, onClose, onSubmit }) {
  const [guess, setGuess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(guess.trim());
    setGuess('');
  };

  return (
    <div className="guess-modal-backdrop">
      <div className="guess-modal">
        <h2>Adivina la imagen</h2>
        <input
          type="text"
          placeholder="Escribe tu respuesta..."
          value={guess}
          onChange={e => setGuess(e.target.value)}
        />
        <div className="guess-modal-buttons">
          <button onClick={handleSubmit} disabled={!guess.trim()}>Enviar</button>
          <button onClick={() => { setGuess(''); onClose(); }}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
