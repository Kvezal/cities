import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  HotelEntity,
  IHotel,
} from 'domains/entities';
import { HotelMapper } from 'modules/adapters/mappers';
import { HotelOrmEntity } from 'modules/adapters/orm-entities';

import { HotelAdapterService } from './hotel-adapter.service';


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
  favorites: [],
};

describe(`Hotel Adapter Service`, () => {
  let service: HotelAdapterService;
  const hotelsParams: IHotel[] = [
    hotelParams,
    {
      ...hotelParams,
      id: `2`,
    }
  ];
  const hotelEntity = HotelEntity.create(hotelParams);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        HotelAdapterService,
        {
          provide: getRepositoryToken(HotelOrmEntity),
          useClass: Repository
        },
      ],
    }).compile();
    service = testModule.get<HotelAdapterService>(HotelAdapterService);
  });

  describe(`loadHotelById method`, () => {
    let hotelOrmEntityResult: HotelEntity;

    beforeEach(async () => {
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain).mockReturnValue(hotelEntity);
      service.getHotelList = jest.fn(service.getHotelList).mockResolvedValue([hotelParams]);
      hotelOrmEntityResult = await service.loadHotelById(hotelParams.id);
    });

    describe(`getHotelList of HotelAdapterService`, () => {
      it(`should call`, async () => {
        expect(service.getHotelList).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        expect(service.getHotelList).toHaveBeenCalledWith({ hotelId: hotelParams.id});
      });
    });

    describe(`mapToDomain method of HotelMapper`, () => {
      it(`should call `, async () => {
        expect(HotelMapper.mapToDomain).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        expect(HotelMapper.mapToDomain).toHaveBeenCalledWith(hotelParams);
      });
    });

    it(`should return result of mapToDomain method of HotelMapper`, async () => {
      expect(hotelOrmEntityResult).toEqual(hotelEntity);
    });
  });

  describe(`loadHotelList method`, () => {
    let hotelOrmEntityResult: HotelEntity[];
    beforeEach(async () => {
      service.getHotelList = jest.fn(service.getHotelList).mockResolvedValueOnce(hotelsParams);
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain).mockReturnValue(hotelEntity);
      hotelOrmEntityResult = await service.loadHotelList({cityId: hotelParams.city.id});
    });

    describe(`getHotelList of HotelAdapterService`, () => {
      it(`should call`, async () => {
        expect(service.getHotelList).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        expect(service.getHotelList).toHaveBeenCalledWith({ cityId: hotelParams.city.id});
      });
    });

    describe(`mapToDomain method of HotelMapper`, () => {
      it(`should call `, async () => {
        expect(HotelMapper.mapToDomain).toHaveBeenCalledTimes(hotelsParams.length);
      });

      it(`should call with params`, async () => {
        expect(HotelMapper.mapToDomain).toHaveBeenNthCalledWith(1, hotelsParams[0]);
        expect(HotelMapper.mapToDomain).toHaveBeenNthCalledWith(2, hotelsParams[1]);
      });
    });

    it(`should return result of mapToDomain method of HotelMapper`, async () => {
      expect(hotelOrmEntityResult).toEqual([hotelEntity, hotelEntity]);
    });
  });
});


