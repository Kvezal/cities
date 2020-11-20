import { shuffle } from './shuffle';

describe(`Shuffle function`, () => {
  it(`should return an array of the same length`, () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffledArray = shuffle(array);
    expect(shuffledArray).toHaveLength(array.length);
  });

  it(`should return an array of the same items`, () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffledArray = shuffle(array);
    expect(shuffledArray).toEqual(expect.arrayContaining(array));
  });
});
