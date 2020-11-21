import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FavoriteEntity, HotelEntity, IFavorite, IHotel } from 'domains/entities';
import { FavoriteMapper, HotelMapper } from 'modules/mappers';
import { FavoriteOrmEntity, HotelOrmEntity } from 'modules/orm-entities';

import { FavoriteAdapterService } from './favorite-adapter.service';


const favoriteParams: IFavorite = {
  value: true,
  userId: `1`,
  hotelId: `1`,
};

const hotelparams: IHotel = {
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

describe(`Favorite Adapter Service`, () => {
  let service: FavoriteAdapterService;
  let favoriteRepositoryService: Repository<FavoriteOrmEntity>;
  let hotelRepositoryService: Repository<HotelOrmEntity>;
  const favoriteEntity: FavoriteEntity = FavoriteMapper.mapToDomain(favoriteParams);
  const favoriteOrmEntity: FavoriteOrmEntity = FavoriteMapper.mapToOrmEntity(favoriteEntity);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteAdapterService,
        {
          provide: getRepositoryToken(FavoriteOrmEntity),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(HotelOrmEntity),
          useClass: Repository
        },
      ],
    }).compile();
    service = testModule.get<FavoriteAdapterService>(FavoriteAdapterService);
    favoriteRepositoryService = testModule.get<Repository<FavoriteOrmEntity>>(getRepositoryToken(FavoriteOrmEntity));
    hotelRepositoryService = testModule.get<Repository<HotelOrmEntity>>(getRepositoryToken(HotelOrmEntity));
  });

  describe(`loadUserStateOfHotel method`, () => {
    it(`should call findOne method of repository`, async () => {
      const findOne = jest.spyOn(favoriteRepositoryService, `findOne`).mockResolvedValueOnce(favoriteOrmEntity);
      await service.loadUserStateOfHotel(favoriteOrmEntity.userId, favoriteOrmEntity.hotelId);
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    it(`should call findOne method of repository with params`, async () => {
      const findOne = jest.spyOn(favoriteRepositoryService, `findOne`).mockResolvedValueOnce(favoriteOrmEntity);
      await service.loadUserStateOfHotel(favoriteOrmEntity.userId, favoriteOrmEntity.hotelId);
      expect(findOne.mock.calls[0][0]).toEqual({
        userId: favoriteOrmEntity.userId,
        hotelId: favoriteOrmEntity.hotelId,
      });
    });

    it(`should call mapToDomain method of FeatureMapper`, async () => {
      jest.spyOn(favoriteRepositoryService, `findOne`).mockResolvedValueOnce(favoriteOrmEntity);
      FavoriteMapper.mapToDomain = jest.fn(FavoriteMapper.mapToDomain);
      await service.loadUserStateOfHotel(favoriteOrmEntity.userId, favoriteOrmEntity.hotelId);
      expect(FavoriteMapper.mapToDomain).toHaveBeenCalledTimes(1);
    });

    it(`shouldn't call mapToDomain method of FeatureMapper`, async () => {
      jest.spyOn(favoriteRepositoryService, `findOne`).mockResolvedValueOnce(null);
      FavoriteMapper.mapToDomain = jest.fn(FavoriteMapper.mapToDomain);
      await service.loadUserStateOfHotel(favoriteOrmEntity.userId, favoriteOrmEntity.hotelId);
      expect(FavoriteMapper.mapToDomain).toHaveBeenCalledTimes(0);
    });

    it(`should call mapToDomain method of FeatureMapper with params`, async () => {
      jest.spyOn(favoriteRepositoryService, `findOne`).mockResolvedValueOnce(favoriteOrmEntity);
      FavoriteMapper.mapToDomain = jest.fn(FavoriteMapper.mapToDomain);
      await service.loadUserStateOfHotel(favoriteOrmEntity.userId, favoriteOrmEntity.hotelId);
      expect(FavoriteMapper.mapToDomain).toHaveBeenCalledWith(favoriteOrmEntity);
    });

    it(`should return result of mapToDomain method of FeatureMapper`, async () => {
      jest.spyOn(favoriteRepositoryService, `findOne`).mockResolvedValueOnce(favoriteOrmEntity);
      FavoriteMapper.mapToDomain = jest.fn(FavoriteMapper.mapToDomain).mockReturnValueOnce(favoriteEntity);
      const result = await service.loadUserStateOfHotel(favoriteOrmEntity.userId, favoriteOrmEntity.hotelId);
      expect(result).toBe(favoriteEntity);
    });
  });

  describe(`saveUserHotelState method`, () => {
    describe(`if favorite entity value equal "true"`, () => {
      it(`should call create method of favorite repository`, async () => {
        const create = jest.spyOn(favoriteRepositoryService, `create`).mockImplementationOnce(() => null);
        jest.spyOn(favoriteRepositoryService, `save`).mockImplementationOnce(async () => favoriteOrmEntity);
        await service.saveUserHotelState(favoriteEntity);
        expect(create).toHaveBeenCalledTimes(1);
      });

      it(`should call create method of favorite repository with params`, async () => {
        const create = jest.spyOn(favoriteRepositoryService, `create`).mockImplementationOnce(() => null);
        jest.spyOn(favoriteRepositoryService, `save`).mockImplementationOnce(async () => favoriteOrmEntity);
        await service.saveUserHotelState(favoriteEntity);
        expect(create).toHaveBeenCalledWith(favoriteOrmEntity);
      });

      it(`should call save method of favorite repository`, async () => {
        jest.spyOn(favoriteRepositoryService, `create`).mockImplementationOnce(() => null);
        const save = jest.spyOn(favoriteRepositoryService, `save`).mockImplementationOnce(async () => favoriteOrmEntity);
        await service.saveUserHotelState(favoriteEntity);
        expect(save).toHaveBeenCalledTimes(1);
      });

      it(`should call save method of favorite repository with params`, async () => {
        jest.spyOn(favoriteRepositoryService, `create`).mockImplementationOnce(() => favoriteOrmEntity);
        const save = jest.spyOn(favoriteRepositoryService, `save`).mockImplementationOnce(async () => favoriteOrmEntity);
        await service.saveUserHotelState(favoriteEntity);
        expect(save).toHaveBeenCalledWith(favoriteOrmEntity);
      });

      it(`should call mapToDomain method of of FavoriteMapper`, async () => {
        jest.spyOn(favoriteRepositoryService, `create`).mockImplementationOnce(() => null);
        jest.spyOn(favoriteRepositoryService, `save`).mockImplementationOnce(async () => favoriteOrmEntity);
        FavoriteMapper.mapToDomain = jest.fn(FavoriteMapper.mapToDomain);
        await service.saveUserHotelState(favoriteEntity);
        expect(FavoriteMapper.mapToDomain).toHaveBeenCalledTimes(1);
      });

      it(`should call mapToDomain method of of FavoriteMapper with params`, async () => {
        jest.spyOn(favoriteRepositoryService, `create`).mockImplementationOnce(() => null);
        jest.spyOn(favoriteRepositoryService, `save`).mockImplementationOnce(async () => favoriteOrmEntity);
        FavoriteMapper.mapToDomain = jest.fn(FavoriteMapper.mapToDomain);
        await service.saveUserHotelState(favoriteEntity);
        expect(FavoriteMapper.mapToDomain).toHaveBeenCalledWith(favoriteOrmEntity);
      });

      it(`should return result of mapToDomain method of FavoriteMapper`, async () => {
        jest.spyOn(favoriteRepositoryService, `create`).mockImplementationOnce(() => null);
        jest.spyOn(favoriteRepositoryService, `save`).mockImplementationOnce(async () => favoriteOrmEntity);
        FavoriteMapper.mapToDomain = jest.fn(FavoriteMapper.mapToDomain).mockReturnValueOnce(favoriteEntity);
        const result = await service.saveUserHotelState(favoriteEntity);
        expect(result).toBe(favoriteEntity);
      });
    });

    describe(`if favorite entity value equal "false"`, () => {
      const favoriteParams: IFavorite = {
        value: false,
        userId: `1`,
        hotelId: `1`,
      };
      const favoriteEntity: FavoriteEntity = FavoriteMapper.mapToDomain(favoriteParams);

      it(`should call delete method of favorite repository`, async () => {
        const deleteMock = jest.spyOn(favoriteRepositoryService, `delete`).mockImplementationOnce(async () => null);
        await service.saveUserHotelState(favoriteEntity);
        expect(deleteMock).toHaveBeenCalledTimes(1);
      });

      it(`should call delete method of favorite repository with params`, async () => {
        const deleteMock = jest.spyOn(favoriteRepositoryService, `delete`).mockImplementationOnce(async () => null);
        await service.saveUserHotelState(favoriteEntity);
        expect(deleteMock).toHaveBeenCalledWith({
          userId: favoriteEntity.userId,
          hotelId: favoriteEntity.hotelId,
        });
      });

      it(`should return result of "undefined"`, async () => {
        jest.spyOn(favoriteRepositoryService, `delete`).mockImplementationOnce(async () => null);
        const result = await service.saveUserHotelState(favoriteEntity);
        expect(result).toBeUndefined();
      });
    });
  });

  describe(`loadFavoriteHotelList method`, () => {
   it(`should call find method of favorite repository`, async  () => {
      const find = jest.spyOn(favoriteRepositoryService, `find`).mockImplementationOnce(async () => []);
      await service.loadFavoriteHotelList(favoriteParams.userId);
      expect(find).toHaveBeenCalledTimes(1);
    });

    it(`should call find method of favorite repository with params`, async  () => {
      const find = jest.spyOn(favoriteRepositoryService, `find`).mockImplementationOnce(async () => []);
      await service.loadFavoriteHotelList(favoriteParams.userId);
      expect(find).toHaveBeenCalledWith({
        loadRelationIds: true,
        where: {
          userId: favoriteParams.userId,
        },
      });
    });

    describe(`favorites aren't found`, () => {
      it(`should return empty array`, async  () => {
        jest.spyOn(favoriteRepositoryService, `find`).mockImplementationOnce(async () => []);
        const result = await service.loadFavoriteHotelList(favoriteParams.userId);
        expect(result).toEqual([]);
      });
    });

    describe(`favorites are found`, () => {
      const hotelEntity: HotelEntity = HotelEntity.create(hotelparams);
      const hotelOrmEntity: HotelOrmEntity = HotelMapper.mapToOrmEntity(hotelEntity);

      beforeEach(() => {
        jest.spyOn(favoriteRepositoryService, `find`).mockImplementationOnce(async () => [favoriteOrmEntity]);
      });

      it(`should call findByIds method of hotel repository`, async  () => {
        const findByIds = jest.spyOn(hotelRepositoryService, `findByIds`).mockImplementationOnce(async () => []);
        await service.loadFavoriteHotelList(favoriteParams.userId);
        expect(findByIds).toHaveBeenCalledTimes(1);
      });

      it(`should call findByIds method of hotel repository with params`, async  () => {
        const findByIds = jest.spyOn(hotelRepositoryService, `findByIds`).mockImplementationOnce(async () => []);
        const hotelIds = [favoriteOrmEntity].map((favoriteOrmEntity: FavoriteOrmEntity) => favoriteOrmEntity.hotelId);
        await service.loadFavoriteHotelList(favoriteParams.userId);
        expect(findByIds).toHaveBeenCalledWith(hotelIds);
      });

      it(`should call mapToDomain method of HotelMapper`, async  () => {
        const foundHotels = [hotelOrmEntity, hotelOrmEntity];
        jest.spyOn(hotelRepositoryService, `findByIds`).mockImplementationOnce(async () => foundHotels);
        HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
        await service.loadFavoriteHotelList(favoriteParams.userId);
        expect(HotelMapper.mapToDomain).toHaveBeenCalledTimes(foundHotels.length);
      });

      it(`should call mapToDomain method of HotelMapper with params`, async  () => {
        const foundHotels = [hotelOrmEntity, hotelOrmEntity];
        jest.spyOn(hotelRepositoryService, `findByIds`).mockImplementationOnce(async () => foundHotels);
        HotelMapper.mapToDomain = jest.fn(HotelMapper.mapToDomain);
        await service.loadFavoriteHotelList(favoriteParams.userId);
        expect(HotelMapper.mapToDomain).toHaveBeenNthCalledWith(1, foundHotels[0]);
        expect(HotelMapper.mapToDomain).toHaveBeenNthCalledWith(2, foundHotels[1]);
      });

      it(`should return array of mapToDomain method results`, async  () => {
        jest.spyOn(hotelRepositoryService, `findByIds`).mockImplementationOnce(async () => [hotelOrmEntity, hotelOrmEntity]);
        const result = await service.loadFavoriteHotelList(favoriteParams.userId);
        expect(result).toEqual([hotelEntity, hotelEntity]);
      });
    });
  })
});
