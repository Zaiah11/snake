import React, { useState, useEffect } from 'react'
import Board from './Board'

const App = () => {
  const [ gameInitialized, setGameInitialized ] = useState(false)
  const [ playerLoc, setPlayerLoc ] = useState({ x: 5, y: 5 })

  const updatePlayerLoc = ({ key }) => {
    setPlayerLoc(previousLoc => {
      let { x, y } = previousLoc
      if (key === 'a') y = y - 1
      if (key === 'd') y = y + 1
      if (key === 'w') x = x - 1
      if (key === 's') x = x + 1
      return { x, y }
    })
  }

  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ])

  const updateBoard = ({ x, y }) => {
    const newBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    newBoard[y][x] = 1
    setBoard(newBoard)
  }

  useEffect(() => {
    if (!gameInitialized) {
      document.addEventListener('keydown', updatePlayerLoc)
      setGameInitialized(true)
    }
    updateBoard(playerLoc)
  }, [playerLoc])

  return (
    <div>
      <Board board={board}/>
    </div>
  )
}

export default App