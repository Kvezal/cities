import { Test, TestingModule } from '@nestjs/testing';

import { HotelEntity, IHotel } from 'domains/entities';
import { HotelService, hotelServiceSymbol } from 'domains/services';
import { HotelMapper, HotelOrmEntity } from 'modules/adapters';
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
    }
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
    }
  ],
};

describe('HotelControllerService', () => {
  let service: HotelControllerService;
  let hotelService: HotelService;
  const hotelEntity: HotelEntity = HotelEntity.create(hotelParams);
  const hotelOrmEntity: HotelOrmEntity = HotelMapper.mapToOrmEntity(hotelEntity);
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
    describe(`getHotelList of HotelService`, () => {
      const cityId = `test`;

      it(`should call`, async () => {
        const getHotelList = jest.spyOn(hotelService, `getHotelList`);
        await service.getHotelList(cityId, null);
        expect(getHotelList).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const getHotelList = jest.spyOn(hotelService, `getHotelList`);
        await service.getHotelList(cityId, null);
        expect(getHotelList).toHaveBeenCalledWith({cityId});
      });

      describe(`mapToOrmEntity method of HotelMapper`, () => {
        it(`should call`, async () => {
          HotelMapper.mapToOrmEntity = jest.fn(HotelMapper.mapToOrmEntity);
          await service.getHotelList(cityId, null);
          expect(HotelMapper.mapToOrmEntity).toHaveBeenCalledTimes(hotelCount);
        });

        it(`should call with params`, async () => {
          HotelMapper.mapToOrmEntity = jest.fn(HotelMapper.mapToOrmEntity);
          await service.getHotelList(cityId, null);
          for (let i = 1; i <= hotelCount; i++) {
            expect(HotelMapper.mapToOrmEntity).toHaveBeenNthCalledWith(i, hotelEntity);
          }
        });
      });

      it(`should return correct result`, async () => {
        const result = await service.getHotelList(cityId, null);
        expect(result).toEqual(Array(hotelCount).fill(hotelOrmEntity));
      });
    });

    describe(`getNearbyHotelList of HotelService`, () => {
      const hotelId = `test`;

      it(`should call`, async () => {
        const getNearbyHotelList = jest.spyOn(hotelService, `getNearbyHotelList`);
        await service.getHotelList(null, hotelId);
        expect(getNearbyHotelList).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const getNearbyHotelList = jest.spyOn(hotelService, `getNearbyHotelList`);
        await service.getHotelList(null, hotelId);
        expect(getNearbyHotelList).toHaveBeenCalledWith(hotelId);
      });

      describe(`mapToOrmEntity method of HotelMapper`, () => {
        it(`should call`, async () => {
          HotelMapper.mapToOrmEntity = jest.fn(HotelMapper.mapToOrmEntity);
          await service.getHotelList(null, hotelId);
          expect(HotelMapper.mapToOrmEntity).toHaveBeenCalledTimes(hotelCount);
        });

        it(`should call with params`, async () => {
          HotelMapper.mapToOrmEntity = jest.fn(HotelMapper.mapToOrmEntity);
          await service.getHotelList(null, hotelId);
          for (let i = 1; i <= hotelCount; i++) {
            expect(HotelMapper.mapToOrmEntity).toHaveBeenNthCalledWith(i, hotelEntity);
          }
        });
      });

      it(`should return correct result`, async () => {
        const result = await service.getHotelList(null, hotelId);
        expect(result).toEqual(Array(hotelCount).fill(hotelOrmEntity));
      });
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

    describe(`mapToOrmEntity method of HotelMapper`, () => {
      it(`should call`, async () => {
        HotelMapper.mapToOrmEntity = jest.fn(HotelMapper.mapToOrmEntity);
        await service.getHotelById(hotelId);
        expect(HotelMapper.mapToOrmEntity).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        HotelMapper.mapToOrmEntity = jest.fn(HotelMapper.mapToOrmEntity);
        await service.getHotelById(hotelId);
        expect(HotelMapper.mapToOrmEntity).toHaveBeenCalledWith(hotelEntity);
      });
    });

    describe(`should return correct result`, () => {
      it(`if hotel with hotelId is existed`, async () => {
        const result = await service.getHotelById(hotelId);
        expect(result).toEqual(hotelOrmEntity);
      });

      it(`if hotel with hotelId isn't existed`, async () => {
        jest.spyOn(hotelService, `getHotelById`).mockImplementationOnce(async () => null);
        const result = await service.getHotelById(hotelId);
        expect(result).toBe(null);
      });
    });
  });
});
