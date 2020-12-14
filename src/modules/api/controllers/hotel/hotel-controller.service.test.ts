import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import {
  HotelEntity,
  IHotel,
} from 'domains/entities';
import {
  HotelService,
  hotelServiceSymbol,
} from 'domains/services';
import { HotelControllerService } from './hotel-controller.service';


const hotelParams: IHotel = {
  id: `1`,
  title: `title`,
  description: `description`,
  bedroomCount: 4,
  maxAdultCount: 2,
  price: 150,
  isPremium: true,
  rating: 3,
  features: [
    {
      id: `1`,
      title: `title`,
    },
    {
      id: `2`,
      title: `title`,
    },
  ],
  type: {
    id: `1`,
    title: `title`,
  },
  city: {
    id: `1`,
    title: `title`,
    location: {
      id: `1`,
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  location: {
    id: `1`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  host: {
    id: `1`,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    type: {
      id: `1`,
      title: `title`,
    },
    image: {
      id: `1`,
      title: `title`,
    },
  },
  images: [
    {
      id: `1`,
      title: `title`,
    },
    {
      id: `2`,
      title: `title`,
    },
  ],
  favorites: [],
};

const expectedHotelOutput = {
  id: `1`,
  title: `title`,
  description: `description`,
  bedroomCount: 4,
  maxAdultCount: 2,
  price: 150,
  isPremium: true,
  rating: 3,
  features: [`title`, `title`],
  type: `title`,
  city: {
    id: `1`,
    title: `title`,
    location: {
      id: `1`,
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  location: {
    id: `1`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  host: {
    id: `1`,
    name: `name`,
    type: `title`,
    image: `title`,
  },
  images: [`title`, `title`],
  isFavorite: false,
}

describe('HotelControllerService', () => {
  let service: HotelControllerService;
  let hotelService: HotelService;
  const hotelEntity: HotelEntity = HotelEntity.create(hotelParams);
  const hotelCount = 5;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        HotelControllerService,
        {
          provide: hotelServiceSymbol,
          useValue: {
            getHotelList: async () => Array(hotelCount).fill(hotelEntity),
            getHotelById: async () => hotelEntity,
            getNearbyHotelList: async () => Array(hotelCount).fill(hotelEntity),
          },
        },
      ],
    }).compile();

    service = testModule.get<HotelControllerService>(HotelControllerService);
    hotelService = testModule.get<HotelService>(hotelServiceSymbol);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`getHotelList`, () => {
    const cityId = `test`;

    it(`should call`, async () => {
      const getHotelList = jest.spyOn(hotelService, `getHotelList`);
      await service.getHotelList({ cityId });
      expect(getHotelList).toHaveBeenCalledTimes(1);
    });

    it(`should call with params`, async () => {
      const getHotelList = jest.spyOn(hotelService, `getHotelList`);
      await service.getHotelList({ cityId });
      expect(getHotelList).toHaveBeenCalledWith({ cityId });
    });

    it(`should return correct result`, async () => {
      const result = await service.getHotelList({ cityId });
      expect(result).toEqual(Array(hotelCount).fill(expectedHotelOutput));
    });
  });

  describe(`getHotelById`, () => {
    const hotelId = `test`;

    describe(`getHotelById of HotelService`, () => {
      it(`should call`, async () => {
        const getHotelById = jest.spyOn(hotelService, `getHotelById`);
        await service.getHotelById(hotelId);
        expect(getHotelById).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const getHotelById = jest.spyOn(hotelService, `getHotelById`);
        await service.getHotelById(hotelId);
        expect(getHotelById).toHaveBeenCalledWith(hotelId);
      });
    });

    describe(`should return correct result`, () => {
      it(`if hotel with hotelId is existed`, async () => {
        const result = await service.getHotelById(hotelId);
        expect(result).toEqual(expectedHotelOutput);
      });

      it(`if hotel with hotelId isn't existed`, async () => {
        jest.spyOn(hotelService, `getHotelById`).mockImplementationOnce(async () => null);
        const result = await service.getHotelById(hotelId);
        expect(result).toBe(null);
      });
    });
  });
});
