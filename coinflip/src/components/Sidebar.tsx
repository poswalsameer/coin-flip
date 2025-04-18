'use client'

import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useAtom, useSetAtom } from 'jotai'
import { betAmountAtom, betResultAtom, betResultAwaitingAtom, currentBetResultsAtom, isBetEndedAtom, isBetStartedAtom, isCashoutClickedAtom, isFirstClickAtom, numberOfBetsAtom, walletBalanceAtom } from '@/store'
import axios from 'axios'
import { toast } from 'sonner'

export default function SidebarComponent() {

  // whole atoms
  const [isBetStarted, setIsBetStarted] = useAtom(isBetStartedAtom);
  const [betAmount, setBetAmount] = useAtom(betAmountAtom);
  const [isFirstClick, setIsFirstClick] = useAtom(isFirstClickAtom);
  const [walletBalance, setWalletBalance] = useAtom(walletBalanceAtom);
  const [currentBetResults, setCurrentBetResults] = useAtom(currentBetResultsAtom);
  const [betResultAwaiting, setBetResultAwaiting] = useAtom(betResultAwaitingAtom);
  const [numberOfBets, setNumberOfBets] = useAtom(numberOfBetsAtom);

  // set atoms
  const setIsCashoutClicked = useSetAtom(isCashoutClickedAtom);
  const setBetResult = useSetAtom(betResultAtom);
  const setIsBetEnded = useSetAtom(isBetEndedAtom);


  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 2) + 1;
  }

  const handleBetStart = () => {
    if (betAmount < 0) {
      toast.error("Cannot place a bet less than Rs.0");
      return;
    }
    if (betAmount > walletBalance) {
      toast.error("Cannot place bet higher than your wallet balance. Please deposit!");
      return;
    }

    setWalletBalance((prev: number) => prev - betAmount);
    setIsBetStarted(!isBetStarted);
    setIsBetEnded(false);
  }

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBetAmount(value);
  }

  const handleOptionClick = async (option: string) => {
    setIsFirstClick(false);

    if (option === "random") {
      const number = generateRandomNumber();
      if (number === 1) {
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

      // adding delay to show animation on UI
      setBetResultAwaiting(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBetResult(response.data.result);
      setCurrentBetResults([...currentBetResults, response.data.result]);
      setBetResultAwaiting(false);

      if (response.data.result === option) {
        setNumberOfBets(numberOfBets + 1);
      } else {
        setNumberOfBets(0);
        setCurrentBetResults([]);
        setIsBetStarted(false);
        setIsFirstClick(true);
        setIsBetEnded(true);
      }

    } catch (error) {
      console.error("Error while getting the result of the bet: ", error);
    }
  }

  const handleCashoutClicked = () => {
    setIsCashoutClicked(true);
    setIsBetEnded(true);
    setCurrentBetResults([]);
    setIsBetStarted(false);
    setIsFirstClick(true);
    setNumberOfBets(0);
  }

  return (
    <div className='min-h-[85vh] w-[25%] bg-[#213743] rounded-l-xl flex flex-col justify-start items-center gap-y-5'>

      {/* Bet amount */}
      <div className='h-full w-full flex flex-col justify-center items-center px-3 mt-10'>
        <div className='w-full flex flex-row justify-between items-center'>
          <div className='text-[#B1BACA] ml-0.5 text-sm mb-1 font-semibold'>Bet Amount</div>
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

      {/* Profit box */}
      {isBetStarted ? <div className='h-full w-full flex flex-col justify-center items-center px-3'>
        <div className='w-full flex flex-row justify-between items-center'>
          <div className='text-[#B1BACA] ml-0.5 text-sm mb-1 font-semibold'>
            Total Profit ({isFirstClick ? "1.00x" : Math.pow(1.96, numberOfBets).toFixed(2) + "x"})
          </div>
        </div>
        <Input
          value={(betAmount * Math.pow(1.96, numberOfBets)).toFixed(2)}
          className='h-10 w-full bg-[#2F4553] rounded-sm p-2 flex font-semibold text-white shadow-md border-none focus-visible:ring-0 placeholder:text-white' />
      </div> : null}


      {/* Pick random button */}
      <div className='w-full px-3'>
        <Button
          className='h-12 w-full bg-[#283E4B] hover:bg-[#47677a] text-sm font-semibold rounded-sm shadow-md text-white hover:cursor-pointer'
          disabled={!isBetStarted || betResultAwaiting}
          onClick={() => handleOptionClick("random")}
        >
          Pick Random Side
        </Button>
      </div>

      {/* Heads and tail buttons */}
      <div className='w-full flex flex-row justify-center items-center px-3 gap-x-2'>
        <Button
          className='h-12 w-1/2 bg-[#283E4B] hover:bg-[#47677a] text-sm font-semibold flex justify-center items-center gap-x-2 rounded-sm shadow-md text-white hover:cursor-pointer'
          disabled={!isBetStarted || betResultAwaiting}
          onClick={() => handleOptionClick("heads")}
        >
          Heads
          <div className='h-4 w-4 mt-0.5 bg-orange-400 rounded-full' />
        </Button>
        <Button
          className='h-12 w-1/2 bg-[#283E4B] hover:bg-[#47677a] text-sm font-semibold rounded-sm flex justify-center items-center gap-x-2 shadow-md text-white hover:cursor-pointer'
          disabled={!isBetStarted || betResultAwaiting}
          onClick={() => handleOptionClick("tails")}
        >
          Tails
          <div className='h-3 w-3 mt-0.5 bg-[#4D6FFF] rotate-45' />
        </Button>
      </div>

      {/* Bet Button */}
      <div className='w-full px-3'>
        {isBetStarted ? <Button
          className='h-12 w-full bg-[#00e701] hover:bg-[#1fff20] text-[#05080A] font-semibold text-sm rounded-sm shadow-md hover:cursor-pointer'
          onClick={handleCashoutClicked}
          disabled={isFirstClick || betResultAwaiting}
        >
          Cashout
        </Button> : <Button
          className='h-12 w-full bg-[#00e701] hover:bg-[#1fff20] text-[#05080A] font-semibold text-sm rounded-sm shadow-md hover:cursor-pointer'
          onClick={handleBetStart}
          disabled={isBetStarted}
        >
          Bet
        </Button>}
      </div>

    </div>
  )
}

