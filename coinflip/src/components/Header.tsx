'use client'

import { walletBalanceAtom } from '@/store'
import { useAtomValue } from 'jotai'
import React from 'react'

export default function HeaderComponent() {

  const walletBalance = useAtomValue(walletBalanceAtom);

  return (
    <div className='w-full h-16 bg-[#1a2c38] shadow-xl flex justify-center items-center'>
        <div className='h-12 w-48 bg-black rounded-md flex justify-center items-center'>
          <div className='h-full w-[60%] bg-[#0f212e] text-white rounded-l-md flex justify-center items-center text-sm font-semibold'>₹{walletBalance.toFixed(2)}</div>
          <div className='h-full w-[40%] bg-blue-500 rounded-r-md text-sm font-semibold text-white flex justify-center items-center'>Wallet</div>
        </div>
    </div>
  )
}

