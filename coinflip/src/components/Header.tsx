import React from 'react'

export default function HeaderComponent() {
  return (
    <div className='w-full h-16 bg-[#1a2c38] shadow-xl flex justify-center items-center'>
        <div className='h-12 w-48 bg-black rounded-md flex justify-center items-center'>
          <div className='h-full w-[60%] bg-[#0f212e] rounded-l-md flex justify-center items-center'>100.00</div>
          <div className='h-full w-[40%] bg-blue-500 rounded-r-md text-xs font-bold font-mono text-white flex justify-center items-center'>Wallet</div>
        </div>
    </div>
  )
}

