import React from 'react';
import ReactDOM from 'react-dom/client'; // Asegúrate de usar la versión correcta para React 18
import './style.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);
