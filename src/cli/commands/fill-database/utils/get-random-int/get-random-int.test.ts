import { getRandomInt } from './get-random-int';


describe(`Get random integer function`, () => {
  it(`should return integer`, () => {
    for (let i = 0; i < 10; i++) {
      const result = getRandomInt(20, 100);
      expect(result).toEqual(Math.floor(result));
    }
  });

  it(`should return integer in a specific range`, () => {
    for (let i = 0; i < 10; i++) {
      const result = getRandomInt(50, 51);
      expect(result).toBeGreaterThanOrEqual(50);
      expect(result).toBeLessThanOrEqual(51);
    }
  });
});
