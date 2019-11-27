import React from 'react'

const GameOver = ({ player }) => (
  <div className="gameOver">
    <h1>Game Over</h1>
    <h3>Score: { player.length}</h3>
    <button 
    autoFocus
    onClick={e => {
      e.preventDefault()
      window.location.reload(true)
    }}>Play Again</button>
  </div>
)

export default GameOver