import React from 'react'

export default function SidebarComponent() {
  return (
    <div className='min-h-[85vh] w-[25%] bg-[#213743] rounded-l-xl flex flex-col justify-start items-center gap-y-5'>

      {/* Bet amount */}
      <div className='h-full w-full flex flex-col justify-center items-center px-3 mt-10'>
        <div className='w-full flex flex-row justify-between items-center'>
          <div className='text-[#B1BACA] ml-0.5 text-sm mb-1 font-'>Bet Amount</div>
        </div>
        <div className='h-10 w-full bg-[#2F4553] rounded-sm p-0.5 flex'>
          <div className='h-full w-[70%] bg-[#0F212E] rounded-l-[2.75px]'></div>
          <div className='h-full w-[30%] flex justify-center items-center'>
            <button className='h-full w-1/2 border-r-2 border-[#0F212E]/60 text-xs font-semibold'>1/2</button>
            <button className='h-full w-1/2 text-xs font-semibold'>2x</button>
          </div>
        </div>
      </div>

      {/* Pick random button */}
      <div className='w-full px-3'>
        <button className='h-12 w-full bg-[#283E4B] text-sm font-semibold rounded-sm shadow-md text-white'>Pick Random Side</button>
      </div>

      {/* Heads and tail buttons */}
      <div className='w-full flex flex-row justify-center items-center px-3 gap-x-2'>
        <button className='h-12 w-1/2 bg-[#283E4B] text-sm font-semibold rounded-sm shadow-md text-white'>Heads</button>
        <button className='h-12 w-1/2 bg-[#283E4B] text-sm font-semibold rounded-sm shadow-md text-white'>Tails</button>
      </div>

      {/* Bet Button */}
      <div className='w-full px-3'>
        <button className='h-12 w-full bg-[#00E701] text-[#05080A] font-semibold text-sm rounded-sm shadow-md'>Bet</button>
      </div>

    </div>

  )
}

