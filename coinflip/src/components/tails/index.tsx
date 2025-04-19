import React from 'react'

export default function TailsComponent() {
  return (
    <div className="relative w-80 h-80">
      {/* Outer circle */}
      <div className="absolute inset-0 rounded-full bg-[#4D6FFF]" />
      {/* Inner circle */}
      <div className="absolute inset-28 rotate-45 bg-[#0f212e]" />
    </div>
  )
}