'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useAtom, useSetAtom } from 'jotai'
import { betAmountAtom, betResultAtom, isBetStartedAtom, isCashoutClickedAtom, isFirstClickAtom } from '@/store'
import axios from 'axios'

export default function SidebarComponent() {

  const [isBetStarted, setIsBetStarted] = useAtom(isBetStartedAtom);
  const [betAmount, setBetAmount] = useAtom(betAmountAtom);
  const [isFirstClick, setIsFirstClick] = useAtom(isFirstClickAtom);
  const [isCashoutClicked, setIsCashoutClicked] = useAtom(isCashoutClickedAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setBetResult = useSetAtom(betResultAtom);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 2) + 1;
  }

  const handleBetStart = () => {
    setIsBetStarted(!isBetStarted)
  }

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBetAmount(value);
  }

  const handleOptionClick = async (option: string) => {
    setIsLoading(true);
    setIsFirstClick(false);

    if( option === "random" ){
      const number = generateRandomNumber();
      if(number === 1){
        option = "heads";
        console.log("head in random")
      } else {
        option = "tails";
        console.log("tails in random")
      }
    }

    try {
      const response = await axios.post("http://localhost:4200/api/result", {
        option: option,
      })
  
      console.log("response:", response.data.result);
      setBetResult(response.data.result);
    } catch (error) {
      console.error("Error while getting the result of the bet: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCashoutClicked = () => {
    setIsCashoutClicked(true);
    setIsBetStarted(false);
    setIsFirstClick(true);
  }

  return (
    <div className='min-h-[85vh] w-[25%] bg-[#213743] rounded-l-xl flex flex-col justify-start items-center gap-y-5'>

      {/* Bet amount */}
      <div className='h-full w-full flex flex-col justify-center items-center px-3 mt-10'>
        <div className='w-full flex flex-row justify-between items-center'>
          <div className='text-[#B1BACA] ml-0.5 text-sm mb-1 font-'>Bet Amount</div>
        </div>
        <div className='h-10 w-full bg-[#2F4553] rounded-sm p-0.5 flex'>
          <Input
            type='number'
            value={betAmount}
            placeholder='0.00'
            onChange={handleBetAmountChange}
            onBlur={() => {
              if (betAmount < 0) {
                setBetAmount(0.00);
              }
            }}
            className='h-full w-[70%] font-semibold bg-[#0F212E] rounded-l-[4px] text-white rounded-r-none border-none focus-visible:ring-0 placeholder:text-white'
            disabled={isBetStarted}
          />
          <div className='h-full w-[30%] flex justify-center items-center'>
            <Button
              className='h-full w-1/2 bg-transparent hover:bg-[#47677a] rounded-none border-r-2 border-[#0F212E]/60 text-xs font-semibold hover:cursor-pointer'
              disabled={isBetStarted}
            >
              1/2
            </Button>
            <Button
              className='h-full w-1/2 bg-transparent hover:bg-[#47677a] p-0 rounded-l-none rounded-r-[4px] text-xs font-semibold hover:cursor-pointer'
              disabled={isBetStarted}
            >
              2x
            </Button>
          </div>
        </div>
      </div>

      {/* Pick random button */}
      <div className='w-full px-3'>
        <Button
          className='h-12 w-full bg-[#283E4B] hover:bg-[#47677a] text-sm font-semibold rounded-sm shadow-md text-white hover:cursor-pointer'
          disabled={!isBetStarted}
          onClick={() => handleOptionClick("random")}
        >
          Pick Random Side
        </Button>
      </div>

      {/* Heads and tail buttons */}
      <div className='w-full flex flex-row justify-center items-center px-3 gap-x-2'>
        <Button
          className='h-12 w-1/2 bg-[#283E4B] hover:bg-[#47677a] text-sm font-semibold flex justify-center items-center gap-x-2 rounded-sm shadow-md text-white hover:cursor-pointer'
          disabled={!isBetStarted}
          onClick={() => handleOptionClick("heads")}
        >
          Heads
          <div className='h-4 w-4 mt-0.5 bg-orange-400 rounded-full' />
        </Button>
        <Button
          className='h-12 w-1/2 bg-[#283E4B] hover:bg-[#47677a] text-sm font-semibold rounded-sm flex justify-center items-center gap-x-2 shadow-md text-white hover:cursor-pointer'
          disabled={!isBetStarted}
          onClick={() => handleOptionClick("tails")}
        >
          Tails
          <div className='h-3 w-3 mt-0.5 bg-[#4D6FFF] rotate-45' />
        </Button>
      </div>

      {/* Bet Button */}
      <div className='w-full px-3'>
        <Button
          className='h-12 w-full bg-[#00e701] hover:bg-[#1fff20] text-[#05080A] font-semibold text-sm rounded-sm shadow-md hover:cursor-pointer'
          onClick={ isBetStarted ? handleCashoutClicked : handleBetStart}
          disabled={isBetStarted && isFirstClick}
        >
          {isBetStarted ? "Cashout" : "Bet"}
        </Button>
      </div>

    </div>
  )
}

