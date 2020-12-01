import { Exception } from '../exception';
import { EUserField } from './user.error.interface';
import { UserError } from './user.error';


describe(`User Error`, () => {
  it.each(Object.values(EUserField))(`should create with %p field`, (field: EUserField) => {
    const error = new UserError({
      field,
      message: `test`,
    });
    expect(error.field).toBe(field);
  });

  it(`should have correct name`, () => {
    const error = new UserError({
      field: EUserField.EMAIL,
      message: `test`,
    });
    expect(error.name).toBe(`UserError`);
  });

  it(`should be instance of Exception`, () => {
    const error = new UserError({
      field: EUserField.EMAIL,
      message: `test`,
    });
    expect(error).toBeInstanceOf(Exception);
  });
});
