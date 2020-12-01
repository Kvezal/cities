import { Exception } from '../exception';
import { EJsonWebTokenType } from './json-web-token.error.interface';
import { JsonWebTokenError } from './json-web-token.error';


describe(`Json Web Token Error`, () => {
  it.each(Object.values(EJsonWebTokenType))(`should create with %p type`, (type: EJsonWebTokenType) => {
    const error = new JsonWebTokenError({
      type,
      message: `test`,
    });
    expect(error.type).toBe(type);
  });

  it(`should have correct name`, () => {
    const error = new JsonWebTokenError({
      type: EJsonWebTokenType.INVALID,
      message: `test`,
    });
    expect(error.name).toBe(`JsonWebTokenError`);
  });

  it(`should be instance of Exception`, () => {
    const error = new JsonWebTokenError({
      type: EJsonWebTokenType.INVALID,
      message: `test`,
    });
    expect(error).toBeInstanceOf(Exception);
  });
});
