import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import {
  HotelEntity,
  IHotel,
} from 'domains/entities';
import { HotelMapper } from 'modules/adapters/mappers';
import { IHotelTableParams } from 'modules/db/interfaces';
import { HotelsDbTable } from 'modules/db';

import { HotelAdapterService } from './hotel-adapter.service';


const hotelTableParams: IHotelTableParams = {
  id: `000554d8-6d39-456d-96a2-9320d8bca76d`,
  title: `title`,
  description: `description`,
  bedroom_count: 4,
  max_adult_count: 2,
  price: 150,
  is_premium: true,
  rating: 3,
  features: [
    {
      id: `35b1508b-fca3-4ee9-b8c9-151660abf438`,
      title: `title`,
    },
    {
      id: `374e7084-31d3-461a-ab80-d1adb1d6ff93`,
      title: `title`,
    }
  ],
  type: {
    id: `4d348ea5-fb35-4085-b2be-5bee2655bf31`,
    title: `title`,
  },
  city: {
    id: `8ddf062f-8d34-4719-80dd-c3f70ac3055f`,
    title: `title`,
    location: {
      id: `934928b7-90e5-4482-8967-941b84b08994`,
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  location: {
    id: `93498b22-73e4-40ab-a632-faf9ff7da893`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  host: {
    id: `c17dab56-94f8-4d86-9835-221b5b7291f2`,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    type: {
      id: `cbf10244-cae7-47ac-b385-b2ceb103051a`,
      title: `title`,
    },
    image: {
      id: `d3db316e-dbe7-43af-b1a9-b184d4baa264`,
      title: `title`,
    },
  },
  images: [
    {
      id: `d9f29621-4739-4305-a72f-90a04542cb28`,
      title: `title`,
    },
    {
      id: `db709632-439a-4c90-a151-044e28919754`,
      title: `title`,
    }
  ],
  is_favorite: false,
};

const hotelEntityParams: IHotel = {
  id: hotelTableParams.id,
  title: hotelTableParams.title,
  description: hotelTableParams.description,
  bedroomCount: hotelTableParams.bedroom_count,
  maxAdultCount: hotelTableParams.max_adult_count,
  price: hotelTableParams.price,
  isPremium: hotelTableParams.is_premium,
  rating: hotelTableParams.rating,
  features: hotelTableParams.features.map((feature) => ({
    id: feature.id,
    title: feature.title,
  })),
  type: {
    id: hotelTableParams.type.id,
    title: hotelTableParams.type.title,
  },
  city: {
    id: hotelTableParams.city.id,
    title: hotelTableParams.city.title,
    location: {
      id: hotelTableParams.city.location.id,
      latitude: hotelTableParams.city.location.latitude,
      longitude: hotelTableParams.city.location.longitude,
      zoom: hotelTableParams.city.location.zoom,
    },
  },
  location: {
    id: hotelTableParams.location.id,
    latitude: hotelTableParams.location.latitude,
    longitude: hotelTableParams.location.longitude,
    zoom: hotelTableParams.location.zoom,
  },
  host: {
    id: hotelTableParams.host.id,
    name: hotelTableParams.host.name,
    email: hotelTableParams.host.email,
    password: hotelTableParams.host.password,
    type: {
      id: hotelTableParams.host.type.id,
      title: hotelTableParams.host.type.title,
    },
    image: {
      id: hotelTableParams.host.image.id,
      title: hotelTableParams.host.image.title,
    },
  },
  images: hotelTableParams.images.map((image) => ({
    id: image.id,
    title: image.title,
  })),
  isFavorite: hotelTableParams.is_favorite,
};

describe(`Hotel Adapter Service`, () => {
  let service: HotelAdapterService;
  let hotelsDbTable: HotelsDbTable;
  const hotelTableParamsList: IHotelTableParams[] = [
    hotelTableParams,
    {
      ...hotelTableParams,
      id: `e8c1ee3c-0070-4902-b840-7cf94ea3c049`,
    }
  ];
  const hotelEntity = HotelEntity.create(hotelEntityParams);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        HotelAdapterService,
        {
          provide: HotelsDbTable,
          useValue: {
            findOne: async () => hotelTableParams,
            findAll: async () => hotelTableParamsList,
          }
        },
      ],
    }).compile();
    service = testModule.get<HotelAdapterService>(HotelAdapterService);
    hotelsDbTable = testModule.get<HotelsDbTable>(HotelsDbTable);
  });

  describe(`loadHotelById method`, () => {
    describe(`findOne method of HotelsDbTable`, () => {
      it(`should call`, async () => {
        const findOne = jest.spyOn(hotelsDbTable, `findOne`).mockResolvedValueOnce(hotelTableParams);
        await service.loadHotelById({
          hotelId: hotelEntityParams.id,
        });
        expect(findOne).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const findOne = jest.spyOn(hotelsDbTable, `findOne`).mockResolvedValueOnce(hotelTableParams);
        await service.loadHotelById({
          hotelId: hotelEntityParams.id,
        });
        expect(findOne).toHaveBeenCalledWith({
          id: hotelEntityParams.id,
          user_id: undefined,
        });
      });
    });

    describe(`mapToDomain method of HotelMapper`, () => {
      it(`should call `, async () => {
        HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain).mockReturnValueOnce(hotelEntity);
        await service.loadHotelById({
          hotelId: hotelEntityParams.id,
        });
        expect(HotelMapper.mapToDomain).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain).mockReturnValueOnce(hotelEntity);
        await service.loadHotelById({
          hotelId: hotelEntityParams.id,
        });
        expect(HotelMapper.mapToDomain).toHaveBeenCalledWith(hotelTableParams);
      });
    });

    it(`should return result of mapToDomain method of HotelMapper`, async () => {
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain).mockReturnValueOnce(hotelEntity);
      const hotelOrmEntityResult = await service.loadHotelById({
          hotelId: hotelEntityParams.id,
        });
      expect(hotelOrmEntityResult).toEqual(hotelEntity);
    });
  });

  describe(`loadHotelList method`, () => {
    describe(`getHotelList of HotelAdapterService`, () => {
      it(`should call`, async () => {
        const findAll = jest.spyOn(hotelsDbTable, `findAll`).mockResolvedValueOnce(hotelTableParamsList);
        await service.loadHotelList({cityId: hotelEntityParams.city.id});
        expect(findAll).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const findAll = jest.spyOn(hotelsDbTable, `findAll`).mockResolvedValueOnce(hotelTableParamsList);
        await service.loadHotelList({cityId: hotelEntityParams.city.id});
        expect(findAll).toHaveBeenCalledWith({
          id: ``,
          is_favorite: false,
          user_id: ``,
          sorting: ``,
          city: {
            id: hotelEntityParams.city.id,
          },
        });
      });
    });

    describe(`mapToDomain method of HotelMapper`, () => {
      it(`should call `, async () => {
        HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
        await service.loadHotelList({cityId: hotelEntityParams.city.id});
        expect(HotelMapper.mapToDomain).toHaveBeenCalledTimes(hotelTableParamsList.length);
      });

      it(`should call with params`, async () => {
        jest.spyOn(hotelsDbTable, `findAll`).mockResolvedValueOnce(hotelTableParamsList);
        HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain).mockReturnValue(hotelEntity);
        await service.loadHotelList({cityId: hotelEntityParams.city.id});
        expect(HotelMapper.mapToDomain).toHaveBeenNthCalledWith(1, hotelTableParamsList[0]);
        expect(HotelMapper.mapToDomain).toHaveBeenNthCalledWith(2, hotelTableParamsList[1]);
      });
    });

    it(`should return result of mapToDomain method of HotelMapper`, async () => {
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain).mockReturnValue(hotelEntity);
      const hotelOrmEntityResult = await service.loadHotelList({cityId: hotelEntityParams.city.id});
      expect(hotelOrmEntityResult).toEqual([hotelEntity, hotelEntity]);
    });
  });
});
