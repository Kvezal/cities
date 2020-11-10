import { HotelType } from './hotel-type';
import { IHotelType } from './hotel-type.interface';


const hotelTypeParams: IHotelType = {
  id: 1,
  title: `title`,
};

describe(`HotelType entity`, () => {
  describe(`constructor`, () => {
    let hotelType: HotelType;

    beforeAll(() => {
      hotelType = new HotelType(
        hotelTypeParams.id,
        hotelTypeParams.title
      );
    });

    it.each([`id`, `title`])(`should create a new HotelType instance with correct %p property`, (property) => {
      expect(hotelType[property]).toBe(hotelTypeParams[property]);
    });
  });

  describe(`create method`, () => {
    let hotelType: HotelType;

    beforeAll(() => {
      hotelType = HotelType.create(hotelTypeParams);
    });

    it(`should create a new HotelType instance`, () => {
      expect(hotelType).toBeInstanceOf(HotelType);
    });

    it.each([`id`, `title`])(`should create a new HotelType instance with correct %p property`, (property) => {
      expect(hotelType[property]).toBe(hotelTypeParams[property]);
    });
  })
});
