import { getRandomInt } from '../get-random-int';
import { getRandomString } from '../get-random-string';


const MIN_COUNT_OF_DOMAIN_PART_SPECIAL_SYMBOLS = 2;
const MIN_COUNT_OF_SECOND_PART_SYMBOLS = 1;
const MAX_COUNT_OF_LOCAL_PART_SYMBOLS = 64;
const MAX_COUNT_OF_EMAIL_SYMBOLS = 256;
const MIN_COUNT_OF_EMAIL_SYMBOLS = 6;


const checkEmailLength = (length): boolean => {
  if (length < MIN_COUNT_OF_EMAIL_SYMBOLS) {
    throw new Error(`Email can't contain less then 5 letters`);
  } else if (length > MAX_COUNT_OF_EMAIL_SYMBOLS) {
    throw new Error(`Email can't contain greater then 256 letters`);
  }
  return true;
};

const getRandomDomain = (domains: string[]): string => {
  const domainZoneCount: number = domains.length;
  if (domainZoneCount === 0) {
    console.error(`"domains" must have greater then 0 domain`);
  }
  const domainIndex: number = getRandomInt(0, domainZoneCount - 1);
  return domains[domainIndex];
};

export const getRandomEmail = (length: number, domains: string[]): string => {
  if (!checkEmailLength(length)) {
    return;
  }
  if (domains.length === 0) {
    throw new Error(`Must have at least 1 domain`);
  }
  const randomDomain: string = getRandomDomain(domains);
  let localPartLength: number = MAX_COUNT_OF_LOCAL_PART_SYMBOLS;
  let domainPartLength: number = MIN_COUNT_OF_SECOND_PART_SYMBOLS;
  const symbolCountOfEmailWithMaxLocalPartLength: number = MAX_COUNT_OF_LOCAL_PART_SYMBOLS + domainPartLength;
  if (length >= symbolCountOfEmailWithMaxLocalPartLength) {
    domainPartLength = length - MIN_COUNT_OF_DOMAIN_PART_SPECIAL_SYMBOLS - localPartLength - randomDomain.length;
  } else {
    localPartLength = length - MIN_COUNT_OF_DOMAIN_PART_SPECIAL_SYMBOLS - domainPartLength - randomDomain.length;
  }
  const localPartEmail: string = getRandomString(localPartLength);
  const domainPartEmail: string = getRandomString(domainPartLength);
  return `${localPartEmail}@${domainPartEmail}.${randomDomain}`;
};
