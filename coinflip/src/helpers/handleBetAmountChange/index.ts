export const handleBetAmountChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setBetAmount: (value: number) => void
) => {
  const value = parseFloat(e.target.value);
  setBetAmount(value);
}