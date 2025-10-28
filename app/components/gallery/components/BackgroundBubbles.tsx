import React from 'react'

export const BackgroundBubbles: React.FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-teal-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-lime-300/15 rounded-full blur-lg animate-pulse delay-2000"></div>
      <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-lime-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-teal-100/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
    </div>
  )
}
