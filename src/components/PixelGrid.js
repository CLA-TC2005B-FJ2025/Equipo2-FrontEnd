import React, { useState } from 'react';

function PixelGrid() {
  const [revealedPixels, setRevealedPixels] = useState(0);
  const totalPixels = 16;

  const handlePixelClick = (index) => {
    // Lógica para manejar clic en píxeles
    setRevealedPixels(prev => prev + 1);
    alert(`Pixel ${index + 1} revelado.`);
  };

  return (
    <section className="grid-section">
      <h2>Elige un pixel</h2>
      <div className="image-container">
        <div className="pixel-grid">
          {[...Array(totalPixels)].map((_, index) => (
            <div key={index} className="pixel" onClick={() => handlePixelClick(index)}>
              ?
            </div>
          ))}
        </div>
      </div>
      <button className="btn-adivinar">Adivina la imagen</button>
    </section>
  );
}

export default PixelGrid;
