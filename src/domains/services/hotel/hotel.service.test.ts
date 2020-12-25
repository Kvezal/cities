import {
  HotelEntity,
  IHotel,
} from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';

import { HotelService } from './hotel.service';
import {
  EHotelField,
  HotelException,
} from 'domains/exceptions/hotel';


const hotelParams: IHotel = {
  id: `4d348ea5-fb35-4085-b2be-5bee2655bf31`,
  title: `title`,
  description: `description`,
  bedroomCount: 4,
  maxAdultCount: 2,
  price: 150,
  isPremium: true,
  rating: 3,
  features: [
    {
      id: `8ddf062f-8d34-4719-80dd-c3f70ac3055f`,
      title: `title`,
    },
    {
      id: `934928b7-90e5-4482-8967-941b84b08994`,
      title: `title`,
    }
  ],
  type: {
    id: `93498b22-73e4-40ab-a632-faf9ff7da893`,
    title: `title`,
  },
  city: {
    id: `c17dab56-94f8-4d86-9835-221b5b7291f2`,
    title: `title`,
    location: {
      id: `cbf10244-cae7-47ac-b385-b2ceb103051a`,
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  location: {
    id: `d3db316e-dbe7-43af-b1a9-b184d4baa264`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  host: {
    id: `d9f29621-4739-4305-a72f-90a04542cb28`,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    type: {
      id: `db709632-439a-4c90-a151-044e28919754`,
      title: `title`,
    },
    image: {
      id: `e8c1ee3c-0070-4902-b840-7cf94ea3c049`,
      title: `title`,
    },
  },
  images: [
    {
      id: `fb847d59-7745-43ae-b7d5-c5fec95d1efc`,
      title: `title`,
    },
    {
      id: `fa4c59d8-1984-4d4e-b623-8e0be8314133`,
      title: `title`,
    }
  ],
  isFavorite: false,
};

const hotelSortingParams: IHotelSortingParams = {
  cityId: `c17dab56-94f8-4d86-9835-221b5b7291f2`,
};

describe(`Hotel Service`, () => {
  const hotelEntity = HotelEntity.create(hotelParams);

  describe(`getHotelList method`, () => {
    let result: HotelEntity[];
    const hotelEntityList = [hotelEntity];
    let loadHotelList;

    beforeEach(async () => {
      loadHotelList = jest.fn().mockResolvedValue(hotelEntityList);
      const hotelService = new HotelService(
        {loadHotelList},
        null,
        null,
      );
      result = await hotelService.getHotelList(hotelSortingParams);
    });

    it(`should return correct result`, async () => {
      expect(result).toEqual(hotelEntityList);
    });

    describe(`loadHotelList method of HotelListLoaderService`, () => {
      it(`should call loadHotelList method`, async () => {
        expect(loadHotelList).toHaveBeenCalledTimes(1);
      });

      it(`should call loadHotelList method with sorting params`, async () => {
        expect(loadHotelList).toHaveBeenCalledWith(hotelSortingParams);
      });
    });
  });

  describe(`getHotelById method`, () => {
    it(`should throw error if hotel with id doesn't exist`, async () => {
      const loadHotelById = jest.fn().mockResolvedValue(null);
      const hotelService = new HotelService(
        null,
        {loadHotelById},
        null,
      );
       ;
      await expect(hotelService.getHotelById(hotelParams.id)).rejects.toThrow(new HotelException({
        field: EHotelField.ID,
        message: `Hotel with ${hotelParams.id} id doesn't exist`,
      }));
    });

    it(`should call loadHotelById method`, async () => {
      const loadHotelById = jest.fn().mockResolvedValue(hotelEntity);
      const hotelService = new HotelService(
        null,
        {loadHotelById},
        null,
      );
      await hotelService.getHotelById(hotelParams.id);
      expect(loadHotelById).toHaveBeenCalledTimes(1);
    });

    it(`should return result of loadHotelById method`, async () => {
      const hotelService = new HotelService(
        null,
        {loadHotelById: async () => hotelEntity},
        null,
      );
      const hotelResult = await hotelService.getHotelById(hotelParams.id);
      expect(hotelResult).toEqual(hotelEntity);
    });
  });
});
