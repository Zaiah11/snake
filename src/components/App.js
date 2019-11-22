import React, { useState, useEffect } from 'react'
import BoardView from './BoardView'
import { generateBoard } from '../game/generateBoard' 

const App = () => {
  const [ direction, setDirection ] = useState(null)
  const [ gameOver, setGameOver ] = useState(false)
  const [ gameInitialized, setGameInitialized ] = useState(false)
  const [ board, setBoard ] = useState(generateBoard())
  const [ playerLoc, setPlayerLoc ] = useState([{ x: Math.floor(board[0].length / 2), y: Math.floor(board.length / 2), isNew: true }])
  const [ food, setFood ] = useState({ x: 2, y: 2 })

  const didPlayerEat = () => {
    const { x, y } = food
    playerLoc.forEach(coordinates => {
      if (coordinates.x === x && coordinates.y === y) {
        generateNewFood() 
        grow()
      }
    })
  }

  const grow = () => {
    const { x, y } = food
    const newPlayerLoc = [{ x, y, isNew: true }, ...playerLoc.map(coordinates => coordinates)]
    newPlayerLoc[1].isNew = false
    setPlayerLoc(newPlayerLoc)
  }

  const didPlayerDie = () => {
    const [{ x, y, isNew }, ...tail ] = playerLoc
    tail.forEach(coordinates => {
      if (coordinates.x === x && coordinates.y === y && !isNew) setGameOver(true)
    })
    if (y < 0 || y > board.length - 1) return setGameOver(true)
    if (x < 0 || x > board[0].length - 1) return setGameOver(true)
    updateBoard()
    didPlayerEat()
  }

  const generateNewFood = () => {
    const possible = []
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] === 0) possible.push({ x, y })
      }
    }
    const idx = Math.floor(Math.random() * (possible.length - 1))
    console.log(idx, possible.length)
    setFood(possible[idx])
  }

  const updateDirection =({ key }) => {
    let newDirection = ''
    if (key === 'a') newDirection = 'LEFT'
    if (key === 'd') newDirection = 'RIGHT'
    if (key === 'w') newDirection = 'UP'
    if (key === 's') newDirection = 'DOWN'
    setDirection(previous => {
      if (previous !== newDirection) updatePlayerLoc(newDirection)
      return newDirection
    })
  }

  const updatePlayerLoc = (direction) => {
    setPlayerLoc(previousLoc => {
      return previousLoc.map((coordinates, i) => {
        if (i === previousLoc.length - 1) {
          let { x, y } = coordinates
          if (direction === 'LEFT') y = y - 1
          if (direction === 'RIGHT') y = y + 1
          if (direction === 'UP') x = x - 1
          if (direction === 'DOWN') x = x + 1
          return { x, y }
        }
        return previousLoc[i + 1]
      })
    })
  }

  const updateBoard = () => {
    const newBoard = generateBoard()
    newBoard[food.y][food.x] = 2
    playerLoc.forEach(coordinates => {
      const { x, y } = coordinates
      newBoard[y][x] = 1
    })
    setBoard(newBoard)
  }

  const step = (newDirection) => {
    updatePlayerLoc(newDirection)
    setTimeout(() => {
      setDirection(direction => {
        step(direction)
        return direction
      })
    }, 250)
  }

  useEffect(() => {
    if (!gameInitialized) {
      step(direction)
      document.addEventListener('keydown', updateDirection)
      setGameInitialized(true)
    }
    didPlayerDie()
  }, [playerLoc, setFood])

  return (
    <div>
      {gameOver ? <div>game over</div> 
      : <BoardView board={board}/>}
    </div>
  )
}

export default App