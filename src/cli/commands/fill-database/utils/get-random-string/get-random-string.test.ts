import { getRandomString } from './get-random-string';


describe(`Get random string function`, () => {
  it(`should return specific length string`, () => {
    const length = 10;
    expect(getRandomString(length)).toHaveLength(length);
  });

  it(`should have specific symbols`, () => {
    const availableSymbols = `abc`;
    const result = getRandomString(100, availableSymbols);
    expect(result).toEqual(expect.not.stringMatching(/[^a-c]+/))
  });
});
