import React from 'react';
import Header from './Header';
import HeroPixel from './HeroPixel';
import HowToPlay from './HowToPlay';
import PixelGrid from './PixelGrid';
import Footer from './Footer';
import Modal from './Modal';

function GamePage({ handleLogout }) {
  return (
    <div>
      <Header />
      <HeroPixel />
      <HowToPlay />
      <PixelGrid />
      <Footer />
      <Modal />
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default GamePage;
