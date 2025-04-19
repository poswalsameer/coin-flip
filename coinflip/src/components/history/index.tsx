'use client'

import { currentBetResultsAtom } from '@/store'
import { useAtomValue } from 'jotai'
import React from 'react'

export default function HistoryComponent() {

  const currentBetResults = useAtomValue(currentBetResultsAtom);

  return (
    <div className='h-32 w-full bg-[#213743] rounded-sm flex flex-col justify-center items-start gap-y-1 px-5'>
      <div className='text-white text-sm font-semibold ml-0.5'>History</div>
      <div className='h-14 w-full bg-[#071D2A] rounded-sm grid grid-cols-20 place-items-center'>
        {Array.from({ length: 20 }).map((_, index) => {
          const result = currentBetResults[index];
          const bgColor = result === 'heads' ? 'bg-orange-500' :
            result === 'tails' ? 'bg-blue-500' :
              'bg-[#0f212e]';
          const size = result === 'tails' ? 'h-6 w-6' : 'h-8 w-8';
          const additionalStyles = result === 'heads' ? 'rounded-full' :
            result === 'tails' ? 'rotate-45' : '';
          return (
            <div key={index} className={`${size} ${bgColor} ${additionalStyles}`}></div>
          );
        })}
      </div>
    </div>
  )
}

