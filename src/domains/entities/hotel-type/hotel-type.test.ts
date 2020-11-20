import { HotelTypeEntity } from './hotel-type.entity';
import { IHotelType } from './hotel-type.interface';


const hotelTypeParams: IHotelType = {
  id: `1`,
  title: `title`,
};

describe(`HotelType entity`, () => {
  describe(`constructor`, () => {
    let hotelType: HotelTypeEntity;

    beforeAll(() => {
      hotelType = new HotelTypeEntity(
        hotelTypeParams.id,
        hotelTypeParams.title
      );
    });

    it.each([`id`, `title`])(`should create a new HotelType instance with correct %p property`, (property) => {
      expect(hotelType[property]).toBe(hotelTypeParams[property]);
    });
  });

  describe(`create method`, () => {
    let hotelType: HotelTypeEntity;

    beforeAll(() => {
      hotelType = HotelTypeEntity.create(hotelTypeParams);
    });

    it(`should create a new HotelType instance`, () => {
      expect(hotelType).toBeInstanceOf(HotelTypeEntity);
    });

    it.each([`id`, `title`])(`should create a new HotelType instance with correct %p property`, (property) => {
      expect(hotelType[property]).toBe(hotelTypeParams[property]);
    });
  })
});
