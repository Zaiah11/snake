import React from 'react'

const Row = ({ row }) => {

  return (
    <div className="row">
      {row.map((token, i) => (
        <div 
          key={i}
          className={token ? (token === 1 ? "tile player" : "tile food") : "tile"}
        >
        </div>
      ))}
    </div>
  )
}

export default Row