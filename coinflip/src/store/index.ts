import { atom } from 'jotai'

export const betAmountAtom = atom<number>(0.00);

export const numberOfBetsAtom = atom<number>(0);

export const isBetStartedAtom = atom<boolean>(false);

export const isFirstClickAtom = atom<boolean>(true);

export const isCashoutClickedAtom = atom<boolean>(false);

export const betResultAtom = atom<string>("");

export const walletBalanceAtom = atom<number>(100);

export const currentBetResultsAtom = atom<(string[])>([]);

export const betResultAwaitingAtom = atom<boolean>(false);

export const isBetEndedAtom = atom<boolean>(false);

export const amountWonAtom = atom<number>(0);

export const multiplierAtom = atom<number>(0.00);