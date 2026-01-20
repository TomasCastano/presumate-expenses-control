import React from 'react'

const Card = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="bg-white rounded-4xl p-6 shadow-lg">{children}</div>
  )
}

export default Card