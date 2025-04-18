import React from 'react'

export default function HistoryComponent() {
  return (
    <div className='h-32 w-full bg-[#213743] rounded-sm flex flex-col justify-center items-start gap-y-1 px-5'>
        <div className='text-white text-sm font-semibold ml-0.5'>History</div>
        <div className='h-14 w-full bg-[#071D2A] rounded-sm grid grid-cols-20 place-items-center'>
            {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className='h-8 w-8 bg-[#0f212e]'></div>
            ))}
        </div>
    </div>
  )
}

