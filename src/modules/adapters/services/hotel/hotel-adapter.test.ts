import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HotelEntity, IHotel } from 'domains/entities';
import { HotelMapper } from 'modules/adapters/mappers';
import { HotelOrmEntity, RatingOrmEntity } from 'modules/adapters/orm-entities';

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
};

describe(`Hotel Adapter Service`, () => {
  let service: HotelAdapterService;
  let hotelRepositoryService: Repository<HotelOrmEntity>;
  let ratingRepositoryService: Repository<RatingOrmEntity>;

  const hotelsParams: IHotel[] = [
    hotelParams,
    {
      ...hotelParams,
      id: `2`,
    }
  ];
  const hotelIds = hotelsParams.map((hotelParam: IHotel) => hotelParam.id);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        HotelAdapterService,
        {
          provide: getRepositoryToken(HotelOrmEntity),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(RatingOrmEntity),
          useClass: Repository
        },
      ],
    }).compile();
    service = testModule.get<HotelAdapterService>(HotelAdapterService);
    hotelRepositoryService = testModule.get<Repository<HotelOrmEntity>>(getRepositoryToken(HotelOrmEntity));
    ratingRepositoryService = testModule.get<Repository<RatingOrmEntity>>(getRepositoryToken(RatingOrmEntity));
  });

  describe(`loadHotelById method`, () => {
    beforeEach(() => {
      service.getHotelsWithRatingByIds = async () => [hotelParams];
    });

    it(`should call findOne method of repository`, async () => {
      const findOne = jest.spyOn(hotelRepositoryService, `findOne`).mockResolvedValueOnce(hotelParams);
      await service.loadHotelById(hotelParams.id);
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    it(`should call findOne method of repository with params`, async () => {
      const findOne = jest.spyOn(hotelRepositoryService, `findOne`).mockResolvedValueOnce(hotelParams);
      await service.loadHotelById(hotelParams.id);
      expect(findOne).toHaveBeenCalledWith(hotelParams.id);
    });

    it(`should call getHotelsWithRatingByIds method`, async () => {
      jest.spyOn(hotelRepositoryService, `findOne`).mockResolvedValueOnce(hotelParams);
      const getHotelsWithRatingByIds = jest.spyOn(service, `getHotelsWithRatingByIds`);
      await service.loadHotelById(hotelParams.id);
      expect(getHotelsWithRatingByIds).toHaveBeenCalledTimes(1);
    });

    it(`should call getHotelsWithRatingByIds method with params`, async () => {
      jest.spyOn(hotelRepositoryService, `findOne`).mockResolvedValueOnce(hotelParams);
      const getHotelsWithRatingByIds = jest.spyOn(service, `getHotelsWithRatingByIds`);
      await service.loadHotelById(hotelParams.id);
      expect(getHotelsWithRatingByIds).toHaveBeenCalledWith([hotelParams]);
    });

    it(`should call mapToDomain method of HotelMapper`, async () => {
      jest.spyOn(hotelRepositoryService, `findOne`).mockResolvedValueOnce(hotelParams);
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
      await service.loadHotelById(hotelParams.id);
      expect(HotelMapper.mapToDomain).toHaveBeenCalledTimes(1);
    });

    it(`should be called mapToDomain method of HotelMapper with params`, async () => {
      jest.spyOn(hotelRepositoryService, `findOne`).mockResolvedValueOnce(hotelParams);
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
      await service.loadHotelById(hotelParams.id);
      expect(HotelMapper.mapToDomain).toHaveBeenCalledWith(hotelParams);
    });

    it(`should return result of mapToDomain method of HotelMapper`, async () => {
      jest.spyOn(hotelRepositoryService, `findOne`).mockResolvedValueOnce(hotelParams);
      const hotelEntity = HotelEntity.create(hotelParams);
      jest.fn(HotelMapper.mapToDomain).mockReturnValue(hotelEntity);
      const hotelOrmEntityResult = await service.loadHotelById(hotelParams.id);
      expect(hotelOrmEntityResult).toEqual(hotelEntity);
    });
  });

  describe(`loadHotelList method`, () => {
    beforeEach(() => {
      service.getHotelsWithRatingByIds = async () => hotelsParams;
    });

    it(`should call find method of repository`, async () => {
      const find = jest.spyOn(hotelRepositoryService, `find`).mockResolvedValueOnce(hotelsParams);
      await service.loadHotelList({cityId: hotelParams.city.id});
      expect(find).toHaveBeenCalledTimes(1);
    });

    it(`should call find method of repository with params`, async () => {
      const find = jest.spyOn(hotelRepositoryService, `find`).mockResolvedValueOnce(hotelsParams);
      await service.loadHotelList({cityId: hotelParams.city.id});
      expect(find).toHaveBeenCalledWith({
        where: {
          city: {
            id: hotelParams.city.id,
          },
        },
      });
    });

    it(`should call getHotelsWithRatingByIds method`, async () => {
      jest.spyOn(hotelRepositoryService, `find`).mockResolvedValueOnce(hotelsParams);
      const getHotelsWithRatingByIds = jest.spyOn(service, `getHotelsWithRatingByIds`);
      await service.loadHotelList({cityId: hotelParams.city.id});
      expect(getHotelsWithRatingByIds).toHaveBeenCalledTimes(1);
    });

    it(`should call getHotelsWithRatingByIds method with params`, async () => {
      jest.spyOn(hotelRepositoryService, `find`).mockResolvedValueOnce(hotelsParams);
      const getHotelsWithRatingByIds = jest.spyOn(service, `getHotelsWithRatingByIds`);
      await service.loadHotelList({cityId: hotelParams.city.id});
      expect(getHotelsWithRatingByIds).toHaveBeenCalledWith(hotelsParams);
    });

    it(`should call mapToDomain method of HotelMapper`, async () => {
      jest.spyOn(hotelRepositoryService, `find`).mockResolvedValueOnce(hotelsParams);
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
      await service.loadHotelList({cityId: hotelParams.city.id});
      expect(HotelMapper.mapToDomain).toHaveBeenCalledTimes(hotelsParams.length);
    });

    it(`should be called mapToDomain method of HotelMapper with params`, async () => {
      jest.spyOn(hotelRepositoryService, `find`).mockResolvedValueOnce(hotelsParams);
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
      await service.loadHotelList({cityId: hotelParams.city.id});
      expect(HotelMapper.mapToDomain).toHaveBeenNthCalledWith(1, hotelsParams[0]);
      expect(HotelMapper.mapToDomain).toHaveBeenNthCalledWith(2, hotelsParams[1]);
    });

    it(`should return result of mapToDomain method of HotelMapper`, async () => {
      const hotelEntityList: HotelEntity[] = hotelsParams.map((hotelParams: IHotel) => HotelEntity.create(hotelParams));
      jest.spyOn(hotelRepositoryService, `find`).mockResolvedValueOnce(hotelsParams);
      const hotelOrmEntityResult = await service.loadHotelList({cityId: hotelParams.city.id});
      expect(hotelOrmEntityResult).toEqual(hotelEntityList);
    });
  });

  describe(`findHotelByIds method`, () => {
    beforeEach(() => {
      service.getHotelsWithRatingByIds = async () => hotelsParams;
    });

    it(`should call findByIds`, async () => {
      const findByIds = jest.spyOn(hotelRepositoryService, `findByIds`).mockResolvedValueOnce([]);
      await service.findHotelByIds(hotelIds);
      expect(findByIds).toHaveBeenCalledTimes(1);
    });

    it(`should call findByIds with params`, async () => {
      const findByIds = jest.spyOn(hotelRepositoryService, `findByIds`).mockResolvedValueOnce([]);
      await service.findHotelByIds(hotelIds);
      expect(findByIds).toHaveBeenCalledWith(hotelIds);
    });

    it(`should call getHotelsWithRatingByIds`, async () => {
      jest.spyOn(hotelRepositoryService, `findByIds`).mockResolvedValueOnce([]);
      const getHotelsWithRatingByIds = jest.spyOn(service, `getHotelsWithRatingByIds`).mockResolvedValueOnce([]);
      await service.findHotelByIds(hotelIds);
      expect(getHotelsWithRatingByIds).toHaveBeenCalledTimes(1);
    });

    it(`should call getHotelsWithRatingByIds with params`, async () => {
      jest.spyOn(hotelRepositoryService, `findByIds`).mockResolvedValueOnce(hotelsParams);
      const getHotelsWithRatingByIds = jest.spyOn(service, `getHotelsWithRatingByIds`).mockResolvedValueOnce([]);
      await service.findHotelByIds(hotelIds);
      expect(getHotelsWithRatingByIds).toHaveBeenCalledWith(hotelsParams);
    });

    it(`should call mapToDomain of HotelMapper`, async () => {
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
      jest.spyOn(hotelRepositoryService, `findByIds`).mockResolvedValueOnce(hotelsParams);
      jest.spyOn(service, `getHotelsWithRatingByIds`).mockResolvedValueOnce(hotelsParams);
      await service.findHotelByIds(hotelIds);
      expect(HotelMapper.mapToDomain).toHaveBeenCalledTimes(2);
    });

    it(`should call mapToDomain of HotelMapper with params`, async () => {
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
      jest.spyOn(hotelRepositoryService, `findByIds`).mockResolvedValueOnce(hotelsParams);
      jest.spyOn(service, `getHotelsWithRatingByIds`).mockResolvedValueOnce(hotelsParams);
      await service.findHotelByIds(hotelIds);
      expect(HotelMapper.mapToDomain).toHaveBeenNthCalledWith(1, hotelsParams[0]);
      expect(HotelMapper.mapToDomain).toHaveBeenNthCalledWith(2, hotelsParams[1]);
    });

    it(`should return correct result`, async () => {
      const hotelEntities: HotelEntity[] = hotelsParams.map(HotelMapper.mapToDomain);
      jest.spyOn(hotelRepositoryService, `findByIds`).mockResolvedValueOnce(hotelsParams);
      jest.spyOn(service, `getHotelsWithRatingByIds`).mockResolvedValueOnce(hotelsParams);
      const result = await service.findHotelByIds(hotelIds);
      expect(result).toEqual(hotelEntities);
    })
  });

  describe(`getHotelsWithRatingByIds method`, () => {
    let createQueryBuilder;
    beforeEach(() => {
      createQueryBuilder = {
        select: () => createQueryBuilder,
        addSelect: () => createQueryBuilder,
        from: () => createQueryBuilder,
        groupBy: () => createQueryBuilder,
        where: () => createQueryBuilder,
        execute: async () => [],
      };
      jest.spyOn(ratingRepositoryService, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);
    });

    it(`should call query builder with correct condition`, async () => {
      createQueryBuilder.where = jest.fn(createQueryBuilder.where);
      await service.getHotelsWithRatingByIds(hotelsParams);
      expect(createQueryBuilder.where.mock.calls[0][1]).toEqual({hotelIds});
    });

    it(`should call execute of query builder`, async () => {
      createQueryBuilder.execute = jest.fn(createQueryBuilder.execute);
      await service.getHotelsWithRatingByIds(hotelsParams);
      expect(createQueryBuilder.execute).toHaveBeenCalledTimes(1);
    });

    it(`should return correct result`, async () => {
      createQueryBuilder.execute = async () => [
        { hotelId: `1`, value: 4 },
        { hotelId: `2`, value: 5 }
      ];
      const result = await service.getHotelsWithRatingByIds(hotelsParams);
      expect(result).toEqual([
        {
          ...hotelsParams[0],
          rating: 4,
        },
        {
          ...hotelsParams[1],
          rating: 5,
        },
      ]);
    });
  });
});


