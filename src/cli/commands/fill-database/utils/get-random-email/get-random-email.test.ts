import { getRandomEmail } from './get-random-email';


describe(`Get random email function`, () => {
  it(`should have correct length`, () => {
    const length = 10;
    const result = getRandomEmail(length, [`com`, `ru`]);
    expect(result).toHaveLength(length);
  });

  it(`should return correct result if email length greater then 6 or equal 6`, () => {
    const length = 6;
    const result = getRandomEmail(length, [`com`, `ru`]);
    expect(result).toHaveLength(length);
  });

  it(`should throw exception if email length less then 6`, () => {
    expect(() => getRandomEmail(5, [`com`, `ru`]))
      .toThrowError(`Email can't contain less then 5 letters`);
  });

  it(`should return correct result if email length less then 256 or equal 256`, () => {
    const length = 256;
    const result = getRandomEmail(length, [`com`, `ru`]);
    expect(result).toHaveLength(length);
  });

  it(`should throw exception if email length greater then 256`, () => {
    expect(() => getRandomEmail(257, [`com`, `ru`]))
      .toThrowError(`Email can't contain greater then 256 letters`);
  });

  it(`should throw exception if domain list is empty`, () => {
    expect(() => getRandomEmail(10, []))
      .toThrowError(`Must have at least 1 domain`);
  });

  it(`should have correct domain`, () => {
    const result = getRandomEmail(10, [`com`, `ru`]);
    expect(result).toEqual(expect.stringMatching(/[com|ru]+$/));
  });
});
