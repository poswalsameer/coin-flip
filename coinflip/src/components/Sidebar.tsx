import React from 'react'
import { Button } from './ui/button'

export default function SidebarComponent() {
  return (
    <div className='min-h-[85vh] w-[25%] bg-[#213743] rounded-l-xl flex flex-col justify-start items-center gap-y-5'>

      {/* Bet amount */}
      <div className='h-full w-full flex flex-col justify-center items-center px-3 mt-10'>
        <div className='w-full flex flex-row justify-between items-center'>
          <div className='text-[#B1BACA] ml-0.5 text-sm mb-1 font-'>Bet Amount</div>
        </div>
        <div className='h-10 w-full bg-[#2F4553] rounded-sm p-0.5 flex'>
          <div className='h-full w-[70%] bg-[#0F212E] rounded-l-[4px]'></div>
          <div className='h-full w-[30%] flex justify-center items-center'>
            <Button className='h-full w-1/2 bg-transparent hover:bg-[#47677a] rounded-none border-r-2 border-[#0F212E]/60 text-xs font-semibold hover:cursor-pointer'>1/2</Button>
            <Button className='h-full w-1/2 bg-transparent hover:bg-[#47677a] p-0 rounded-l-none rounded-r-[4px] text-xs font-semibold hover:cursor-pointer '>2x</Button>
          </div>
        </div>
      </div>

      {/* Pick random button */}
      <div className='w-full px-3'>
        <Button className='h-12 w-full bg-[#283E4B] hover:bg-[#47677a] text-sm font-semibold rounded-sm shadow-md text-white hover:cursor-pointer'>Pick Random Side</Button>
      </div>

      {/* Heads and tail buttons */}
      <div className='w-full flex flex-row justify-center items-center px-3 gap-x-2'>
        <Button className='h-12 w-1/2 bg-[#283E4B] hover:bg-[#47677a] text-sm font-semibold flex justify-center items-center gap-x-2 rounded-sm shadow-md text-white hover:cursor-pointer'>
          Heads
          <div className='h-4 w-4 mt-0.5 bg-orange-400 rounded-full' />
        </Button>
        <Button className='h-12 w-1/2 bg-[#283E4B] hover:bg-[#47677a] text-sm font-semibold rounded-sm flex justify-center items-center gap-x-2 shadow-md text-white hover:cursor-pointer'>
          Tails
          <div className='h-3 w-3 mt-0.5 bg-purple-500 rotate-45' />
        </Button>
      </div>

      {/* Bet Button */}
      <div className='w-full px-3'>
        <Button className='h-12 w-full bg-[#00e701] hover:bg-[#00e600] text-[#05080A] font-semibold text-sm rounded-sm shadow-md hover:cursor-pointer'>Bet</Button>
      </div>

    </div>

  )
}

