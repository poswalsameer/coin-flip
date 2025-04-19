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
    <div className='min-h-[85vh] w-[75%] flex flex-col gap-y-10 justify-center items-center bg-[#0f212e] rounded-r-xl'>

      {/* Top coin flip area */}
      <div className='h-full w-full flex justify-center items-center'>
        {betResultAwaiting
          ? <CoinAnimationComponent />
          : betResult === "heads" ? <HeadsComponent /> : <TailsComponent />}
      </div>

      {/* Bottom history part */}
      <div className='relative -bottom-8 w-full px-5'>
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