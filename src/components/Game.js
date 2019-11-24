import React, { useState, useEffect } from 'react'
import BoardView from './BoardView'
import { generateBoard } from '../game/generateBoard' 
import GameOver from './GameOver'

const Game = ({ settings }) => {
  const emptyBoard = generateBoard(settings.size)
  const [ direction, setDirection ] = useState(null)
  const [ gameOver, setGameOver ] = useState(false)
  const [ gameInitialized, setGameInitialized ] = useState(false)
  const [ board, setBoard ] = useState(() => emptyBoard())
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
    const tail = playerLoc.slice(0, playerLoc.length - 1)
    const head = playerLoc[playerLoc.length - 1]
    const { x, y } = head
    tail.forEach(coordinates => {
      if (coordinates.x === x && coordinates.y === y && !coordinates.isNew) {
        return playerDied('player ran into self')
      }
    })
    if (y < 0 || y > board.length - 1 || x < 0 || x > board[0].length - 1) {
      return playerDied('player exceeded board boundaries')
    }
    updateBoard()
    didPlayerEat()
  }

  const playerDied = (msg) => {
    console.log(msg)
    if (playerLoc.length > window.localStorage.getItem('snakeHighScore')) {
      window.localStorage.setItem('snakeHighScore', playerLoc.length)
    }
    setGameOver(true)
  }

  const generateNewFood = () => {
    const possible = []
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] === 0) possible.push({ x, y })
      }
    }
    const idx = Math.floor(Math.random() * (possible.length - 1))
    setFood(possible[idx])
  }

  const updateDirection =({ key }) => {
    let newDirection = ''
    if (key === 'a') newDirection = 'LEFT'
    if (key === 'd') newDirection = 'RIGHT'
    if (key === 'w') newDirection = 'UP'
    if (key === 's') newDirection = 'DOWN'
    setDirection(previous => {
      if (previous !== newDirection) {
        updatePlayerLoc(newDirection)
      }
      return newDirection
    })
  }

  const updatePlayerLoc = (direction) => {
    setPlayerLoc(previousLoc => {
      return previousLoc.map((coordinates, i) => {
        if (i === previousLoc.length - 1) {
          let { x, y, isNew } = coordinates
          if (direction === 'LEFT') y = y - 1
          if (direction === 'RIGHT') y = y + 1
          if (direction === 'UP') x = x - 1
          if (direction === 'DOWN') x = x + 1
          return { x, y, isNew }
        }
        return previousLoc[i + 1]
      })
    })
  }

  const updateBoard = () => {
    const newBoard = emptyBoard()
    newBoard[food.y][food.x] = 2
    playerLoc.forEach(coordinates => {
      const { x, y } = coordinates
      newBoard[y][x] = 1
    })
    setBoard(newBoard)
  }

  let step;

  const handleStep = () => {
    setDirection(direction => {
      updatePlayerLoc(direction)
      setGameOver(gameOver => {
        if (gameOver) endStep()
        return gameOver
      })
      return direction
    })
  }

  const endStep = () => clearInterval(step)

  const initGame = () => {
    const { difficulty } = settings
    const difficulties = {
      'EASY': 350,
      'MED': 200,
      'HARD': 150,
      'NIGHTMARE': 50
    }
    const rate = difficulties[difficulty]
    console.log(rate)
    step = setInterval(handleStep, rate)
    document.addEventListener('keydown', updateDirection)
    setGameInitialized(true)
  }

  useEffect(() => {
    if (!gameInitialized) initGame()
    didPlayerDie()
  }, [playerLoc, setFood])

  return (
    <div className="gameView">
      {gameOver ? <GameOver player={playerLoc}/>
      : <BoardView updateDirection={updateDirection} board={board}/>}
    </div>
  )
}

export default Game