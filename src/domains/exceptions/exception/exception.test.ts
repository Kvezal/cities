import { Exception } from './exception';

enum ETestExceptionField {
  FIELD_1=  `test field 1`,
  FIELD_2 = `test field 2`,
  FIELD_3 = `test field 3`
}

enum ETestExceptionType {
  TYPE_1=  `test type 1`,
  TYPE_2 = `test type 2`,
  TYPE_3 = `test type 3`
}

describe(`Exception`, () => {
  it.each(Object.values(ETestExceptionField))(`should create with %p field`, (field: ETestExceptionField) => {
    const error = new Exception<ETestExceptionField>({
      field,
      message: `test`,
    });
    expect(error.field).toBe(field);
  });

  it.each(Object.values(ETestExceptionType))(`should create with %p type`, (type: ETestExceptionType) => {
    const error = new Exception<null, ETestExceptionType>({
      type,
      message: `test`,
    });
    expect(error.type).toBe(type);
  });

  it(`should have correct message`, () => {
    const error = new Exception({
      message: `test`,
    });
    expect(error.message).toBe(`test`);
  });

  it(`should have correct description`, () => {
    const error = new Exception({
      message: `test`,
    });
    expect(error.description).toBe(`test`);
  });

  it(`should have correct name`, () => {
    const error = new Exception({
      message: `test`,
    });
    expect(error.name).toBe(`Exception`);
  });

  it(`should be instance of Error`, () => {
    const error = new Exception({
      message: `test`,
    });
    expect(error).toBeInstanceOf(Error);
  });
});
