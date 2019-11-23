import React from 'react'

const GameOver = ({ player }) => (
  <div className="gameOver">
    <h1>Game Over</h1>
    <h3>Score: { player.length}</h3>
  </div>
)

export default GameOver