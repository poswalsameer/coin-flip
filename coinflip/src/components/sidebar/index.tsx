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

    setBetResultAwaiting(true);
    // Vercel - https://coin-flip-q1yq.vercel.app/
    // Render - https://coin-flip-tyuu.onrender.com
    try {
      const response = await axios.post("/api/result", {
        option: option,
      })

      // adding delay to show animation on UI
      await new Promise(resolve => setTimeout(resolve, 1000));
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
    <div className='
    h-full w-[100%] bg-[#213743] rounded-b-md pb-5 flex flex-col justify-start items-center gap-y-5
    sm:h-full sm:w-[100%] sm:bg-[#213743] sm:rounded-b-lg sm:pb-5 sm:flex sm:flex-col sm:justify-start sm:items-center sm:gap-y-5
    md:h-full md:w-[100%] md:bg-[#213743] md:rounded-b-xl md:pb-5 md:flex md:flex-col md:justify-start md:items-center md:gap-y-5
    lg:min-h-[85vh] lg:w-[25%] lg:bg-[#213743] lg:rounded-l-xl lg:rounded-br-none lg:flex lg:flex-col lg:justify-start lg:items-center lg:gap-y-5'>

      {/* Bet amount */}
      <div className='
      h-full w-full flex flex-col justify-center items-center px-4 mt-5
      sm:h-full sm:w-full sm:flex sm:flex-col sm:justify-center sm:items-center sm:px-4 sm:mt-5
      md:h-full md:w-full md:flex md:flex-col md:justify-center md:items-center md:px-4 md:mt-5
      lg:h-full lg:w-full lg:flex lg:flex-col lg:justify-center lg:items-center lg:px-3 lg:mt-10'>
        <div className='
        w-full flex flex-row justify-between items-center
        sm:w-full sm:flex sm:flex-row sm:justify-between sm:items-center
        md:w-full md:flex md:flex-row md:justify-between md:items-center
        lg:w-full lg:flex lg:flex-row lg:justify-between lg:items-center'>
          <div className='
          text-[#B1BACA] ml-0.5 text-sm mb-1 font-semibold
          sm:text-[#B1BACA] sm:ml-0.5 sm:text-sm sm:mb-1 sm:font-semibold
          md:text-[#B1BACA] md:ml-0.5 md:text-sm md:mb-1 md:font-semibold
          lg:text-[#B1BACA] lg:ml-0.5 lg:text-sm lg:mb-1 lg:font-semibold'>Bet Amount</div>
        </div>
        <div className='
        h-10 w-full bg-[#2F4553] rounded-sm p-0.5 flex
        sm:h-10 sm:w-full sm:bg-[#2F4553] sm:rounded-sm sm:p-0.5 sm:flex
        md:h-10 md:w-full md:bg-[#2F4553] md:rounded-sm md:p-0.5 md:flex
        lg:h-10 lg:w-full lg:bg-[#2F4553] lg:rounded-sm lg:p-0.5 lg:flex'>
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
            className='
            h-full w-[70%] font-semibold bg-[#0F212E] rounded-l-[4px] text-white rounded-r-none border-none focus-visible:ring-0 placeholder:text-white
            sm:h-full sm:w-[70%] sm:font-semibold sm:bg-[#0F212E] sm:rounded-l-[4px] sm:text-white sm:rounded-r-none sm:border-none sm:focus-visible:ring-0 sm:placeholder:text-white
            md:h-full md:w-[70%] md:font-semibold md:bg-[#0F212E] md:rounded-l-[4px] md:text-white md:rounded-r-none md:border-none md:focus-visible:ring-0 md:placeholder:text-white
            lg:h-full lg:w-[70%] lg:font-semibold lg:bg-[#0F212E] lg:rounded-l-[4px] lg:text-white lg:rounded-r-none lg:border-none lg:focus-visible:ring-0 lg:placeholder:text-white'
            disabled={isBetStarted}
          />
          <div className='
          h-full w-[30%] flex justify-center items-center
          sm:h-full sm:w-[30%] sm:flex sm:justify-center sm:items-center
          md:h-full md:w-[30%] md:flex md:justify-center md:items-center
          lg:h-full lg:w-[30%] lg:flex lg:justify-center lg:items-center'>
            <Button
              className='
              h-full w-1/2 bg-transparent hover:bg-[#47677a] rounded-none border-r-2 border-[#0F212E]/60 text-xs font-semibold hover:cursor-pointer
              sm:h-full sm:w-1/2 sm:bg-transparent sm:hover:bg-[#47677a] sm:rounded-none sm:border-r-2 sm:border-[#0F212E]/60 sm:text-xs sm:font-semibold sm:hover:cursor-pointer
              md:h-full md:w-1/2 md:bg-transparent md:hover:bg-[#47677a] md:rounded-none md:border-r-2 md:border-[#0F212E]/60 md:text-xs md:font-semibold md:hover:cursor-pointer
              lg:h-full lg:w-1/2 lg:bg-transparent lg:hover:bg-[#47677a] lg:rounded-none lg:border-r-2 lg:border-[#0F212E]/60 lg:text-xs lg:font-semibold lg:hover:cursor-pointer'
              disabled={isBetStarted}
              onClick={handleHalfAmount}
            >
              1/2
            </Button>
            <Button
              className='
              h-full w-1/2 bg-transparent hover:bg-[#47677a] p-0 rounded-l-none rounded-r-[4px] text-xs font-semibold hover:cursor-pointer
              sm:h-full sm:w-1/2 sm:bg-transparent sm:hover:bg-[#47677a] sm:p-0 sm:rounded-l-none sm:rounded-r-[4px] sm:text-xs sm:font-semibold sm:hover:cursor-pointer
              md:h-full md:w-1/2 md:bg-transparent md:hover:bg-[#47677a] md:p-0 md:rounded-l-none md:rounded-r-[4px] md:text-xs md:font-semibold md:hover:cursor-pointer
              lg:h-full lg:w-1/2 lg:bg-transparent lg:hover:bg-[#47677a] lg:p-0 lg:rounded-l-none lg:rounded-r-[4px] lg:text-xs lg:font-semibold lg:hover:cursor-pointer'
              disabled={isBetStarted}
              onClick={handleDoubleAmount}
            >
              2x
            </Button>
          </div>
        </div>
      </div>

      {/* Profit box */}
      {isBetStarted ? <div className='
      h-full w-full flex flex-col justify-center items-center px-4
      sm:h-full sm:w-full sm:flex sm:flex-col sm:justify-center sm:items-center sm:px-4
      md:h-full md:w-full md:flex md:flex-col md:justify-center md:items-center md:px-4
      lg:h-full lg:w-full lg:flex lg:flex-col lg:justify-center lg:items-center lg:px-3'>
        <div className='
        w-full flex flex-row justify-between items-center
        sm:w-full sm:flex sm:flex-row sm:justify-between sm:items-center
        md:w-full md:flex md:flex-row md:justify-between md:items-center
        lg:w-full lg:flex lg:flex-row lg:justify-between lg:items-center'>
          <div className='
          text-[#B1BACA] ml-0.5 text-sm mb-1 font-semibold
          sm:text-[#B1BACA] sm:ml-0.5 sm:text-sm sm:mb-1 sm:font-semibold
          md:text-[#B1BACA] md:ml-0.5 md:text-sm md:mb-1 md:font-semibold
          lg:text-[#B1BACA] lg:ml-0.5 lg:text-sm lg:mb-1 lg:font-semibold'>
            Total Profit ({isFirstClick ? "1.00x" : Math.pow(1.96, numberOfBets).toFixed(2) + "x"})
          </div>
        </div>
        <Input
          value={(betAmount * Math.pow(1.96, numberOfBets)).toFixed(2)}
          className='
          h-10 w-full bg-[#2F4553] rounded-sm p-2 flex font-semibold text-white shadow-md border-none focus-visible:ring-0 placeholder:text-white
          sm:h-10 sm:w-full sm:bg-[#2F4553] sm:rounded-sm sm:p-2 sm:flex sm:font-semibold sm:text-white sm:shadow-md sm:border-none sm:focus-visible:ring-0 sm:placeholder:text-white
          md:h-10 md:w-full md:bg-[#2F4553] md:rounded-sm md:p-2 md:flex md:font-semibold md:text-white md:shadow-md md:border-none md:focus-visible:ring-0 md:placeholder:text-white
          lg:h-10 lg:w-full lg:bg-[#2F4553] lg:rounded-sm lg:p-2 lg:flex lg:font-semibold lg:text-white lg:shadow-md lg:border-none lg:focus-visible:ring-0 lg:placeholder:text-white'
          readOnly
        />
      </div> : null}


      {/* Pick random button */}
      <div className='
      w-full px-4
      sm:w-full sm:px-4
      md:w-full md:px-4
      lg:w-full lg:px-3'>
        <Button
          className='
          h-12 w-full bg-[#283E4B] hover:bg-[#47677a] text-sm font-semibold rounded-sm shadow-md text-white hover:cursor-pointer
          sm:h-12 sm:w-full sm:bg-[#283E4B] sm:hover:bg-[#47677a] sm:text-sm sm:font-semibold sm:rounded-sm sm:shadow-md sm:text-white sm:hover:cursor-pointer
          md:h-12 md:w-full md:bg-[#283E4B] md:hover:bg-[#47677a] md:text-sm md:font-semibold md:rounded-sm md:shadow-md md:text-white md:hover:cursor-pointer
          lg:h-12 lg:w-full lg:bg-[#283E4B] lg:hover:bg-[#47677a] lg:text-sm lg:font-semibold lg:rounded-sm lg:shadow-md lg:text-white lg:hover:cursor-pointer'
          disabled={!isBetStarted || betResultAwaiting}
          onClick={() => handleOptionClick("random")}
        >
          Pick Random Side
        </Button>
      </div>

      {/* Heads and tail buttons */}
      <div className='
      w-full flex flex-row justify-center items-center px-5 gap-x-2
      sm:w-full sm:flex sm:flex-row sm:justify-center sm:items-center sm:px-5 sm:gap-x-2
      md:w-full md:flex md:flex-row md:justify-center md:items-center md:px-5 md:gap-x-2
      lg:w-full lg:flex lg:flex-row lg:justify-center lg:items-center lg:px-3 lg:gap-x-2'>
        <Button
          className='
          h-12 w-1/2 bg-[#283E4B] hover:bg-[#47677a] text-sm font-semibold flex justify-center items-center gap-x-2 rounded-sm shadow-md text-white hover:cursor-pointer
          sm:h-12 sm:w-1/2 sm:bg-[#283E4B] sm:hover:bg-[#47677a] sm:text-sm sm:font-semibold sm:flex sm:justify-center sm:items-center sm:gap-x-2 sm:rounded-sm sm:shadow-md sm:text-white sm:hover:cursor-pointer
          md:h-12 md:w-1/2 md:bg-[#283E4B] md:hover:bg-[#47677a] md:text-sm md:font-semibold md:flex md:justify-center md:items-center md:gap-x-2 md:rounded-sm md:shadow-md md:text-white md:hover:cursor-pointer
          lg:h-12 lg:w-1/2 lg:bg-[#283E4B] lg:hover:bg-[#47677a] lg:text-sm lg:font-semibold lg:flex lg:justify-center lg:items-center lg:gap-x-2 lg:rounded-sm lg:shadow-md lg:text-white lg:hover:cursor-pointer'
          disabled={!isBetStarted || betResultAwaiting}
          onClick={() => handleOptionClick("heads")}
        >
          Heads
          <div className='
          h-4 w-4 mt-0.5 bg-orange-400 rounded-full
          md:h-4 md:w-4 md:mt-0.5 md:bg-orange-400 md:rounded-full
          lg:h-4 lg:w-4 lg:mt-0.5 lg:bg-orange-400 lg:rounded-full' />
        </Button>
        <Button
          className='
          h-12 w-1/2 bg-[#283E4B] hover:bg-[#47677a] text-sm font-semibold rounded-sm flex justify-center items-center gap-x-2 shadow-md text-white hover:cursor-pointer
          sm:h-12 sm:w-1/2 sm:bg-[#283E4B] sm:hover:bg-[#47677a] sm:text-sm sm:font-semibold sm:rounded-sm sm:flex sm:justify-center sm:items-center sm:gap-x-2 sm:shadow-md sm:text-white sm:hover:cursor-pointer
          md:h-12 md:w-1/2 md:bg-[#283E4B] md:hover:bg-[#47677a] md:text-sm md:font-semibold md:rounded-sm md:flex md:justify-center md:items-center md:gap-x-2 md:shadow-md md:text-white md:hover:cursor-pointer
          lg:h-12 lg:w-1/2 lg:bg-[#283E4B] lg:hover:bg-[#47677a] lg:text-sm lg:font-semibold lg:rounded-sm lg:flex lg:justify-center lg:items-center lg:gap-x-2 lg:shadow-md lg:text-white lg:hover:cursor-pointer'
          disabled={!isBetStarted || betResultAwaiting}
          onClick={() => handleOptionClick("tails")}
        >
          Tails
          <div className='
          h-3 w-3 mt-0.5 bg-[#4D6FFF] rotate-45
          sm:h-3 sm:w-3 sm:mt-0.5 sm:bg-[#4D6FFF] sm:rotate-45
          md:h-3 md:w-3 md:mt-0.5 md:bg-[#4D6FFF] md:rotate-45
          lg:h-3 lg:w-3 lg:mt-0.5 lg:bg-[#4D6FFF] lg:rotate-45' />
        </Button>
      </div>

      {/* Bet Button */}
      <div className='
      w-full px-4
      sm:w-full sm:px-4
      md:w-full md:px-4
      lg:w-full lg:px-3'>
        {isBetStarted ? <Button
          className='
          h-12 w-full bg-[#00e701] hover:bg-[#1fff20] text-[#05080A] font-semibold text-sm rounded-sm shadow-md hover:cursor-pointer
          sm:h-12 sm:w-full sm:bg-[#00e701] sm:hover:bg-[#1fff20] sm:text-[#05080A] sm:font-semibold sm:text-sm sm:rounded-sm sm:shadow-md sm:hover:cursor-pointer
          md:h-12 md:w-full md:bg-[#00e701] md:hover:bg-[#1fff20] md:text-[#05080A] md:font-semibold md:text-sm md:rounded-sm md:shadow-md md:hover:cursor-pointer
          lg:h-12 lg:w-full lg:bg-[#00e701] lg:hover:bg-[#1fff20] lg:text-[#05080A] lg:font-semibold lg:text-sm lg:rounded-sm lg:shadow-md lg:hover:cursor-pointer'
          onClick={handleCashoutClicked}
          disabled={isFirstClick || betResultAwaiting}
        >
          Cashout
        </Button> : <Button
          className='
          h-12 w-full bg-[#00e701] hover:bg-[#1fff20] text-[#05080A] font-semibold text-sm rounded-sm shadow-md hover:cursor-pointer
          sm:h-12 sm:w-full sm:bg-[#00e701] sm:hover:bg-[#1fff20] sm:text-[#05080A] sm:font-semibold sm:text-sm sm:rounded-sm sm:shadow-md sm:hover:cursor-pointer
          md:h-12 md:w-full md:bg-[#00e701] md:hover:bg-[#1fff20] md:text-[#05080A] md:font-semibold md:text-sm md:rounded-sm md:shadow-md md:hover:cursor-pointer
          lg:h-12 lg:w-full lg:bg-[#00e701] lg:hover:bg-[#1fff20] lg:text-[#05080A] lg:font-semibold lg:text-sm lg:rounded-sm lg:shadow-md lg:hover:cursor-pointer'
          onClick={handleBetStart}
          disabled={isBetStarted}
        >
          Bet
        </Button>}
      </div>

    </div>
  )
}

