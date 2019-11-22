import React from 'react'
import Row from './Row'

const Board = ({ board }) => {
  
  return (
    <div className="board">
      {board.map((row, i) => (
        <Row row={row} key={i}/>
      ))}
    </div>
  )
}

export default Board