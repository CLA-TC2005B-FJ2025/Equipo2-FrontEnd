import React from 'react';
import './Leaderboard.css';

function Leaderboard() {
  // Datos de ejemplo
  const players = [
    { name: 'Isma', score: 4 },
    { name: 'Jose', score: 2 },
    { name: 'Diego S', score: 1 },
    { name: 'Diego T', score: 1 },
  ];

  return (
    <aside className="leaderboard">
      <div className="head">
        <i className="fas fa-crown"></i>
        <h1>Jugadores con mayor Puntaje</h1>
      </div>
      <div className="body">
        <ol>
          {players.map((p, i) => (
            <li key={i}>
              <mark>{p.name}</mark>
              <small>{p.score}</small>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

export default Leaderboard;
