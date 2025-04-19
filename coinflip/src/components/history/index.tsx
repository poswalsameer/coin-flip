'use client'

import { currentBetResultsAtom } from '@/store'
import { useAtomValue } from 'jotai'
import React from 'react'

export default function HistoryComponent() {

  const currentBetResults = useAtomValue(currentBetResultsAtom);

  return (
    <div className='
    h-24 w-full bg-[#213743] rounded flex flex-col justify-center items-start gap-y-1 px-2
    sm:h-28 sm:w-full sm:bg-[#213743] sm:rounded-sm sm:flex sm:flex-col sm:justify-center sm:items-start sm:gap-y-1 sm:px-3
    md:h-28 md:w-full md:bg-[#213743] md:rounded-sm md:flex md:flex-col md:justify-center md:items-start md:gap-y-1 md:px-4
    lg:h-28 lg:w-full lg:bg-[#213743] lg:rounded-sm lg:flex lg:flex-col lg:justify-center lg:items-start lg:gap-y-1 lg:px-4
    xl:h-32 xl:w-full xl:bg-[#213743] xl:rounded-sm xl:flex xl:flex-col xl:justify-center xl:items-start xl:gap-y-1 xl:px-5
    2xl:h-32 2xl:w-full 2xl:bg-[#213743] 2xl:rounded-sm 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-start 2xl:gap-y-1 2xl:px-5'>
      <div className='
      text-white text-sm font-semibold ml-0.5
      sm:text-white sm:text-sm sm:font-semibold sm:ml-0.5
      md:text-white md:text-sm md:font-semibold md:ml-0.5
      lg:text-white lg:text-sm lg:font-semibold lg:ml-0.5
      xl:text-white xl:text-sm xl:font-semibold xl:ml-0.5
      2xl:text-white 2xl:text-sm 2xl:font-semibold 2xl:ml-0.5'>History</div>
      <div className='
      h-10 w-full bg-[#071D2A] rounded grid grid-cols-20 place-items-center px-1
      sm:h-14 sm:w-full sm:bg-[#071D2A] sm:rounded-sm sm:grid sm:grid-cols-20 sm:place-items-center sm:px-2
      md:h-14 md:w-full md:bg-[#071D2A] md:rounded-sm md:grid md:grid-cols-20 md:place-items-center
      lg:h-14 lg:w-full lg:bg-[#071D2A] lg:rounded-sm lg:grid lg:grid-cols-20 lg:place-items-center
      xl:h-14 xl:w-full xl:bg-[#071D2A] xl:rounded-sm xl:grid xl:grid-cols-20 xl:place-items-center
      2xl:h-14 2xl:w-full 2xl:bg-[#071D2A] 2xl:rounded-sm 2xl:grid 2xl:grid-cols-20 2xl:place-items-center'>
        {Array.from({ length: 20 }).map((_, index) => {
          const result = currentBetResults[index];
          const bgColor = result === 'heads' ? 'bg-orange-500' :
            result === 'tails' ? 'bg-blue-500' :
              'bg-[#0f212e]';
          const size = result === 'tails' ? 'h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-4 lg:w-4 xl:h-6 xl:w-6 2xl:h-6 2xl:w-6' : 'h-3 w-3 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-6 lg:w-6 xl:h-8 xl:w-8 2xl:h-8 2xl:w-8';
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

