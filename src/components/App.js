import React, { useState, useEffect } from 'react'
import BoardView from './BoardView'
import { generateBoard } from '../game/generateBoard' 

const App = () => {
  const [ gameInitialized, setGameInitialized ] = useState(false)
  const [ playerLoc, setPlayerLoc ] = useState([{ x: 5, y: 5 }])
  const [ food, setFood ] = useState([{ x: 2, y: 2 }])

  const updatePlayer = () => {
    //see if player is touching food
    //if so increase player length and delete that food

    food.forEach((f_coordinates, i) => {
      const { x, y } = f_coordinates
      playerLoc.forEach(p_coordinates => {
        if (p_coordinates.x === x && p_coordinates.y === y) { 

          const newPlayerLoc = playerLoc.map(coordinates => coordinates)
          newPlayerLoc.unshift({ x, y })
          setPlayerLoc(newPlayerLoc)

          setFood(food.filter((coordinates, idx) => i !== idx))
        }
      })
    })
  }

  const updatePlayerLoc = ({ key }) => {
    setPlayerLoc(previousLoc => {
      return previousLoc.map((coordinates, i) => {
        if (i === previousLoc.length - 1) {
          let { x, y } = coordinates
          if (key === 'a') y = y - 1
          if (key === 'd') y = y + 1
          if (key === 'w') x = x - 1
          if (key === 's') x = x + 1
          return { x, y }
        }
        return previousLoc[i + 1]
      })
    })
  }

  const [board, setBoard] = useState(generateBoard())

  const updateBoard = () => {
    const newBoard = generateBoard()
    food.forEach(coordinates => {
      const { x, y } = coordinates
      newBoard[y][x] = 2
    })
    playerLoc.forEach(coordinates => {
      const { x, y } = coordinates
      newBoard[y][x] = 1
    })
    setBoard(newBoard)
  }

  useEffect(() => {
    if (!gameInitialized) {
      document.addEventListener('keydown', updatePlayerLoc)
      setGameInitialized(true)
    }
    updateBoard()
    updatePlayer()
  }, [playerLoc])

  return (
    <div>
      <BoardView board={board}/>
    </div>
  )
}

export default App