'use client'

import React from 'react'
import { useAtomValue } from 'jotai'
import {
  amountWonAtom,
  betResultAtom,
  betResultAwaitingAtom,
  isBetEndedAtom,
  multiplierAtom,
} from '@/store'
import {
  CoinAnimationComponent,
  HeadsComponent,
  HistoryComponent,
  TailsComponent
} from '../index';

export default function GameContainerComponent() {

  // atom values
  const betResult = useAtomValue(betResultAtom);
  const betResultAwaiting = useAtomValue(betResultAwaitingAtom);
  const isBetEnded = useAtomValue(isBetEndedAtom);
  const amountWon = useAtomValue(amountWonAtom);
  const multiplier = useAtomValue(multiplierAtom);

  return (
    <div className='
    min-h-[60vh] w-[100%] flex flex-col gap-y-10 justify-center items-center bg-[#0f212e] rounded-t-md
    sm:min-h-[85vh] sm:w-[100%] sm:flex sm:flex-col sm:gap-y-10 sm:justify-center sm:items-center sm:bg-[#0f212e] sm:rounded-t-lg
    md:min-h-[85vh] md:w-[100%] md:flex md:flex-col md:gap-y-10 md:justify-center md:items-center md:bg-[#0f212e] md:rounded-t-xl 
    lg:min-h-[85vh] lg:w-[75%] lg:flex lg:flex-col lg:gap-y-10 lg:justify-center lg:items-center lg:bg-[#0f212e] lg:rounded-r-xl lg:rounded-t-none
    xl:min-h-[85vh] xl:w-[75%] xl:flex xl:flex-col xl:gap-y-10 xl:justify-center xl:items-center xl:bg-[#0f212e] xl:rounded-r-xl
    2xl:min-h-[85vh] 2xl:w-[75%] 2xl:flex 2xl:flex-col 2xl:gap-y-10 2xl:justify-center 2xl:items-center 2xl:bg-[#0f212e] 2xl:rounded-r-xl'>

      {/* Top coin flip area */}
      <div className='
        h-full w-full flex justify-center items-center my-0 sm:my-5
        sm:h-full sm:w-full sm:flex sm:justify-center sm:items-center
        md:h-full md:w-full md:flex md:justify-center md:items-center
        lg:h-full lg:w-full lg:flex lg:justify-center lg:items-center
        xl:h-full xl:w-full xl:flex xl:justify-center xl:items-center
        2xl:h-full 2xl:w-full 2xl:flex 2xl:justify-center 2xl:items-center'>
        {betResultAwaiting
          ? <CoinAnimationComponent />
          : betResult === "heads" ? <HeadsComponent /> : <TailsComponent />}
      </div>

      {/* Bottom history part */}
      <div className='
        w-full px-3
        sm:w-full sm:px-5
        md:w-full md:px-5
        lg:w-full lg:px-5
        xl:w-full xl:px-5
        2xl:w-full 2xl:px-5'>
        <HistoryComponent />
      </div>

      {/* UI showing the winning screen */}
      {isBetEnded && <div className='absolute top-1/2 -translate-y-1/2 h-36 w-40 gap-y-3 rounded-2xl bg-[#0f212e] text-white border-[6px] border-[#00E701] flex flex-col justify-center items-center'>
        <div className='text-2xl font-extrabold text-[#00E701]'>
          {multiplier === 0 ? "0.00x" : multiplier + "x"}
        </div>
        <div className='h-1 w-[40%] bg-[#2F4553]' />
        <div className='text-[#00E701] font-bold text-lg'>₹{amountWon.toFixed(2)}</div>
      </div>}

    </div>
  )
}