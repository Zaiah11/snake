import React from 'react'

const Row = ({ row }) => {

  return (
    <div className="row">
      {row.map((token, i) => (
        <div 
          key={i}
          className={token ? "tile active" : "tile"}
        >
        </div>
      ))}
    </div>
  )
}

export default Row