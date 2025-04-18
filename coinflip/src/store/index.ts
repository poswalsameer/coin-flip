import { atom } from 'jotai'

export const betAmountAtom = atom<number>(0.00);

export const numberOfBetsAtom = atom<number>(0);

export const isBetStartedAtom = atom<boolean>(false);

export const isFirstClickAtom = atom<boolean>(true);

export const isCashoutClickedAtom = atom<boolean>(false);

export const betResultAtom = atom<string>("");