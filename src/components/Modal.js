import React, { useState } from 'react';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Abrir Modal</button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={closeModal}>×</button>
            <h3>Pregunta</h3>
            <div className="options">
              <label><input type="radio" name="question" /> Opción 1</label>
              <label><input type="radio" name="question" /> Opción 2</label>
            </div>
            <button className="submit-answer-btn">Responder</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
