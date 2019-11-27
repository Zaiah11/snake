import React, { useState } from 'react'
import Game from './Game'
import Setup from './Setup'

const App = () => {
  const [ view, setView ] = useState('SETUP')
  const [ settings, setSettings ] = useState({ difficulty: 'EASY', size: {width: 11, height:11}})

  return (
    <div>
      {view === 'SETUP' && 
        <Setup 
          setView={setView}
          setSettings={setSettings}
        />}
      {view === 'GAME' && 
        <Game
          settings={settings}
        />}
    </div>
  )
}

export default App