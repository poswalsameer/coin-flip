import React from 'react'

export default function HeadsComponent() {
  return (
    <div className="relative w-80 h-80">
      {/* Outer circle */}
      <div className="absolute inset-0 rounded-full bg-orange-400" />
      {/* Inner circle */}
      <div className="absolute inset-20 rounded-full bg-[#0f212e]" />
    </div>
  )
}
