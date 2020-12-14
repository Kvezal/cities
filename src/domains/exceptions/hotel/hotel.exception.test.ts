import { Exception } from '../exception';
import { EHotelField } from './hotel.exception.interface';
import { HotelException } from './hotel.exception';


describe(`Comment Error`, () => {
  it.each(Object.values(EHotelField))(`should create with %p field`, (field: EHotelField) => {
    const error = new HotelException({
      field,
      message: `test`,
    });
    expect(error.field).toBe(field);
  });

  it(`should have correct name`, () => {
    const error = new HotelException({
      field: EHotelField.ID,
      message: `test`,
    });
    expect(error.name).toBe(`HotelException`);
  });

  it(`should be instance of Exception`, () => {
    const error = new HotelException({
      field: EHotelField.ID,
      message: `test`,
    });
    expect(error).toBeInstanceOf(Exception);
  });
});