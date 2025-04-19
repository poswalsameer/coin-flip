import React from 'react'

export default function TailsComponent() {
  return (
    <div className="
    relative w-48 h-48
    sm:relative sm:w-72 sm:h-72
    md:relative md:w-72 md:h-72
    lg:relative lg:w-72 lg:h-72  
    xl:relative xl:w-72 xl:h-72
      2xl:relative 2xl:w-80 2xl:h-80">
      {/* Outer circle */}
      <div className="absolute inset-0 rounded-full bg-[#4D6FFF]" />
      {/* Inner circle */}
      <div className="absolute inset-16 sm:inset-24 md:inset-24 lg:inset-24 xl:inset-24 2xl:inset-28 rotate-45 bg-[#0f212e]" />
    </div>
  )
}