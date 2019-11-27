import React, { useState } from 'react'

const Setup = ({ setView, setSettings }) => {
  const [ difficulty, setDifficulty ] = useState('MED')
  const [ width, setWidth ] = useState(11)
  const [ height, setHeight ] = useState(11)

  const handleSubmit = () => {
    setSettings({
      difficulty,
      size: {
        width,
        height
      }
    })
    setView('GAME')
  }

  return (
    <form 
    className="settings"
    onSubmit={(e) => {
      e.preventDefault()
      handleSubmit()
    }}>
      <h1>Snake</h1>
      Select difficulty
      <select 
      defaultValue="MED"
      onChange={(e) => {
        e.preventDefault()
        setDifficulty(e.target.value)
      }}>
        <option value="EASY">Easy</option>
        <option value="MED">Medium</option>
        <option value="HARD">Hard</option>
        <option value="NIGHTMARE">Nightmare</option>
      </select>
      Map Width
      <input 
      value={width}
      onChange={(e) => {
        e.preventDefault()
        setWidth(e.target.value)
      }}
      ></input>
      Map Height
      <input
      value={height}
      onChange={(e) => {
        e.preventDefault()
        setHeight(e.target.value)
      }}></input>
      <button 
      autoFocus
      type="submit"
      >Submit</button>
    </form>
  )
}

export default Setup