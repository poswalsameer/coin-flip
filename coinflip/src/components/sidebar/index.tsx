'use client'

import React, { useEffect, useRef } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import {
  amountWonAtom,
  betAmountAtom,
  betResultAtom,
  betResultAwaitingAtom,
  currentBetResultsAtom,
  isBetEndedAtom,
  isBetStartedAtom,
  isCashoutClickedAtom,
  isFirstClickAtom,
  multiplierAtom,
  numberOfBetsAtom,
  walletBalanceAtom
} from '@/store'
import axios from 'axios'
import { toast } from 'sonner'
import {
  generateRandomNumber,
  handleBetAmountChange,
  playSound
} from '@/helpers'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function SidebarComponent() {

  // whole atoms
  const [isBetStarted, setIsBetStarted] = useAtom(isBetStartedAtom);
  const [betAmount, setBetAmount] = useAtom(betAmountAtom);
  const [isFirstClick, setIsFirstClick] = useAtom(isFirstClickAtom);
  const [walletBalance, setWalletBalance] = useAtom(walletBalanceAtom);
  const [currentBetResults, setCurrentBetResults] = useAtom(currentBetResultsAtom);
  const [betResultAwaiting, setBetResultAwaiting] = useAtom(betResultAwaitingAtom);
  const [numberOfBets, setNumberOfBets] = useAtom(numberOfBetsAtom);
  const [amountWon, setAmountWon] = useAtom(amountWonAtom);

  // set atoms
  const setIsCashoutClicked = useSetAtom(isCashoutClickedAtom);
  const setBetResult = useSetAtom(betResultAtom);
  const setIsBetEnded = useSetAtom(isBetEndedAtom);
  const setMultiplier = useSetAtom(multiplierAtom);

  // useRefs
  const betSoundRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("/betButtonSound.mp3") : undefined
  );

  const cashoutSoundRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("/cashoutSound.mp3") : undefined
  );


  // Function triggered when bet button clicked
  const handleBetStart = () => {
    //updating the older values
    setMultiplier(0.00);

    if (betAmount < 0) {
      toast.error("Cannot place a bet less than Rs.0");
      return;
    }
    if (betAmount > walletBalance) {
      toast.error("Cannot place bet higher than your wallet balance. Please deposit!");
      return;
    }

    const newBalance = walletBalance - betAmount;
    setWalletBalance(newBalance);
    localStorage.setItem('walletBalance', newBalance.toString());
    setIsBetStarted(!isBetStarted);
    setIsBetEnded(false);

    playSound(betSoundRef);
  }


  // Function triggered when heads/tails/random clicked
  const handleOptionClick = async (option: string) => {
    setIsFirstClick(false);

    if (option === "random") {
      const number = generateRandomNumber();
      if (number === 1) {
        option = "heads";
      } else {
        option = "tails";
      }
    }

    try {
      const response = await axios.post("http://localhost:4200/api/result", {
        option: option,
      })

      // adding delay to show animation on UI
      setBetResultAwaiting(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBetResult(response.data.result);
      setCurrentBetResults([...currentBetResults, response.data.result]);
      setBetResultAwaiting(false);

      if (response.data.result === option) {
        const newNumberOfBets = numberOfBets + 1;
        setNumberOfBets(newNumberOfBets);
        setMultiplier(parseFloat(Math.pow(1.96, newNumberOfBets).toFixed(2)));
        setAmountWon(parseFloat((betAmount * Math.pow(1.96, newNumberOfBets)).toFixed(2)));

        // Check if player has reached 20 consecutive wins
        if (newNumberOfBets >= 20) {
          setMultiplier(parseFloat(Math.pow(1.96, newNumberOfBets).toFixed(2)));
          setAmountWon(parseFloat((betAmount * Math.pow(1.96, newNumberOfBets)).toFixed(2)));
          setIsBetEnded(true);
          setIsBetStarted(false);
          setIsFirstClick(true);
          setNumberOfBets(0);
          setCurrentBetResults([]);

          playSound(cashoutSoundRef);
        }
      } else {
        setMultiplier(0.00);
        setNumberOfBets(0);
        setCurrentBetResults([]);
        setIsBetStarted(false);
        setIsFirstClick(true);
        setIsBetEnded(true);
        setAmountWon(0.00);
      }

    } catch (error) {
      console.error("Error while getting the result of the bet: ", error);
    }
  }

  const handleDoubleAmount = () => {
    const newAmount = parseFloat((betAmount * 2).toFixed(2));
    if (newAmount > walletBalance) {
      toast.error("Cannot double bet amount beyond your wallet balance");
      return;
    }
    setBetAmount(newAmount);
  }

  const handleHalfAmount = () => {
    let newAmount = parseFloat((betAmount / 2).toFixed(2));
    if (newAmount < 0.01) {
      newAmount = 0.00;
    }
    setBetAmount(newAmount);
  }

  // Function triggered when cashout button clicked
  const handleCashoutClicked = () => {
    setMultiplier(parseFloat(Math.pow(1.96, numberOfBets).toFixed(2)));
    setAmountWon(parseFloat((betAmount * Math.pow(1.96, numberOfBets)).toFixed(2)));
    setIsCashoutClicked(true);
    setIsBetEnded(true);
    setCurrentBetResults([]);
    setIsBetStarted(false);
    setIsFirstClick(true);
    setNumberOfBets(0);

    playSound(cashoutSoundRef);

    // Update wallet balance in state and localStorage
    const newBalance = walletBalance + amountWon;
    setWalletBalance(newBalance);
    localStorage.setItem('walletBalance', newBalance.toString());
  }

  useEffect(() => {
    const storedBalance = localStorage.getItem('walletBalance');

    if (storedBalance) {
      setWalletBalance(parseFloat(storedBalance));
    } else {
      const initialBalance = 10000;
      localStorage.setItem('walletBalance', initialBalance.toString());
      setWalletBalance(initialBalance);
    }
  }, [setWalletBalance]);

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
            onChange={(e) => handleBetAmountChange(e, setBetAmount)}
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
              onClick={handleHalfAmount}
            >
              1/2
            </Button>
            <Button
              className='h-full w-1/2 bg-transparent hover:bg-[#47677a] p-0 rounded-l-none rounded-r-[4px] text-xs font-semibold hover:cursor-pointer'
              disabled={isBetStarted}
              onClick={handleDoubleAmount}
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
          className='h-10 w-full bg-[#2F4553] rounded-sm p-2 flex font-semibold text-white shadow-md border-none focus-visible:ring-0 placeholder:text-white'
          readOnly
        />
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

