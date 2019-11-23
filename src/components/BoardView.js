import React from 'react'
import Row from './Row'

const BoardView = ({ board }) => {
  
  return (
    <div>
      <h2>highscore: {window.localStorage.getItem('snakeHighScore')}</h2>
      <div className="board">
        {board.map((row, i) => (
          <Row row={row} key={i}/>
        ))}
      </div>
    </div>
  )
}

export default BoardView