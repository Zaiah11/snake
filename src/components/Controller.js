import React from 'react'

const Controller = ({ updateDirection }) => {

  return (
    <div className="controller">
    <button onClick={e => {
      e.preventDefault()
      updateDirection({key:'w'})
    }}> {'/\\'} </button>
    <div className="sides">
      <button onClick={e => {
        e.preventDefault()
        updateDirection({key:'a'})
      }}> {'<'} </button>
      <button onClick={e => {
        e.preventDefault()
        updateDirection({key:'d'})
      }}> {'>'} </button>
    </div>
      <button onClick={e => {
        e.preventDefault()
        updateDirection({key:'s'})
      }}> {'\\/'} </button>
    </div>
  )
}

export default Controller