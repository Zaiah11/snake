import React from 'react'
import Row from './Row'
import Controller from './Controller'

const BoardView = ({ board, updateDirection }) => {
  
  return (
    <div className="boardView">
      <h2>highscore: {window.localStorage.getItem('snakeHighScore')}</h2>
      <div className="board">
        {board.map((row, i) => (
          <Row row={row} key={i}/>
        ))}
      </div>
      <Controller updateDirection={updateDirection}/>
    </div>
  )
}

export default BoardView