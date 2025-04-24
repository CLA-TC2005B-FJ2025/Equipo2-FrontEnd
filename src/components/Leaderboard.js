import React from 'react';
import './Leaderboard.css';

function Leaderboard() {
  // Datos de ejemplo
  const players = [
    { name: 'Jerry Wood', score: 948 },
    { name: 'Brandon Barnes', score: 750 },
    { name: 'Raymond Knight', score: 684 },
    { name: 'Trevor McCormick', score: 335 },
    { name: 'Andrew Fox', score: 296 },
  ];

  return (
    <aside className="leaderboard">
      <div className="head">
        <i className="fas fa-crown"></i>
        <h1>Most Active Players</h1>
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
