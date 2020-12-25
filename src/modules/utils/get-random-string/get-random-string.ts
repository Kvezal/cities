import { AVAILABLE_EMAIL_SYMBOLS } from '../constants';
import { getRandomInt } from '../get-random-int';


export const getRandomString = (length: number, availableSymbols: string = AVAILABLE_EMAIL_SYMBOLS): string => {
  return new Array(length)
    .fill(``)
    .reduce((acc) => {
      const randomSymbolIndex = getRandomInt(0, availableSymbols.length - 1);
      acc += availableSymbols[randomSymbolIndex];
      return acc;
    }, ``);
};
