import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HotelEntity, IHotel } from 'domains/entities';
import { HotelMapper } from 'modules/mappers';
import { HotelOrmEntity } from 'modules/orm-entities';

import { HotelAdapterService } from './hotel-adapter.service';


const hotelOrmEntity: IHotel = {
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
  let repositoryService: Repository<HotelOrmEntity>;

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
    repositoryService = testModule.get<Repository<HotelOrmEntity>>(getRepositoryToken(HotelOrmEntity));
  });

  describe(`loadHotelById method`, () => {
    it(`should call find one method of repository`, async () => {
      const findOne = jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(hotelOrmEntity);
      await service.loadHotelById(hotelOrmEntity.id);
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    it(`should call mapToDomain method of HotelMapper`, async () => {
      jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(hotelOrmEntity);
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
      await service.loadHotelById(hotelOrmEntity.id);
      expect(HotelMapper.mapToDomain).toHaveBeenCalledTimes(1);
    });

    it(`should be called mapToDomain method of HotelMapper with params`, async () => {
      jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(hotelOrmEntity);
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
      await service.loadHotelById(hotelOrmEntity.id);
      expect(HotelMapper.mapToDomain).toHaveBeenCalledWith(hotelOrmEntity);
    });

    it(`should return result of mapToDomain method of HotelMapper`, async () => {
      jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(hotelOrmEntity);
      const hotelEntity = HotelEntity.create(hotelOrmEntity);
      jest.fn(HotelMapper.mapToDomain).mockReturnValue(hotelEntity);
      const hotelOrmEntityResult = await service.loadHotelById(hotelOrmEntity.id);
      expect(hotelOrmEntityResult).toEqual(hotelEntity);
    });
  });

  describe(`loadHotelList method`, () => {
    const hotelOrmEntityList: IHotel[] = [
      hotelOrmEntity,
      {
        ...hotelOrmEntity,
        id: `2`,
      }
    ];

    it(`should call find method of repository`, async () => {
      const find = jest.spyOn(repositoryService, `find`).mockResolvedValueOnce(hotelOrmEntityList);
      await service.loadHotelList({cityId: hotelOrmEntity.city.id});
      expect(find).toHaveBeenCalledTimes(1);
    });

    it(`should call find method of repository with params`, async () => {
      const find = jest.spyOn(repositoryService, `find`).mockResolvedValueOnce(hotelOrmEntityList);
      await service.loadHotelList({cityId: hotelOrmEntity.city.id});
      expect(find).toHaveBeenCalledWith({
        where: {
          city: {
            id: hotelOrmEntity.city.id,
          },
        },
      });
    });

    it(`should call mapToDomain method of HotelMapper`, async () => {
      jest.spyOn(repositoryService, `find`).mockResolvedValueOnce(hotelOrmEntityList);
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
      await service.loadHotelList({cityId: hotelOrmEntity.city.id});
      expect(HotelMapper.mapToDomain).toHaveBeenCalledTimes(hotelOrmEntityList.length);
    });

    it(`should be called mapToDomain method of HotelMapper with params`, async () => {
      jest.spyOn(repositoryService, `find`).mockResolvedValueOnce(hotelOrmEntityList);
      HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
      await service.loadHotelList({cityId: hotelOrmEntity.city.id});
      expect(HotelMapper.mapToDomain).toHaveBeenNthCalledWith(1, hotelOrmEntityList[0]);
      expect(HotelMapper.mapToDomain).toHaveBeenNthCalledWith(2, hotelOrmEntityList[1]);
    });

    it(`should return result of mapToDomain method of HotelMapper`, async () => {
      const hotelEntityList: HotelEntity[] = hotelOrmEntityList.map((hotelOrmEntity: IHotel) => HotelEntity.create(hotelOrmEntity));
      jest.spyOn(repositoryService, `find`).mockResolvedValueOnce(hotelOrmEntityList);
      const hotelOrmEntityResult = await service.loadHotelList({cityId: hotelOrmEntity.city.id});
      expect(hotelOrmEntityResult).toEqual(hotelEntityList);
    });
  });
});
