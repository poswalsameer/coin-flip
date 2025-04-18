'use client'

import React from 'react'
import HeadsComponent from './Heads'
import TailsComponent from './Tails'
import HistoryComponent from './History'
import { useAtomValue } from 'jotai'
import { betResultAtom } from '@/store'

export default function GameContainerComponent() {

  const betResult = useAtomValue(betResultAtom);

  return (
    <div className='min-h-[85vh] w-[75%] flex flex-col gap-y-10 justify-center items-center bg-[#0f212e] rounded-r-xl'>

      {/* Top coin flip area */}
      <div className='h-full w-full flex justify-center items-center'>
        {betResult === "heads" ? <HeadsComponent /> : <TailsComponent />}
      </div>

      {/* Bottom history part */}
      <div className='relative -bottom-8 w-full px-5'>
        <HistoryComponent />
      </div>


    </div>
  )
}