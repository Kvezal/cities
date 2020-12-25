import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import { FavoriteAdapterService } from 'modules/adapters';
import { FavoritesDbTable } from 'modules/db';
import { IFavoriteTableParams } from 'modules/db/interfaces';
import {
  FavoriteEntity,
  IFavorite,
} from 'domains/entities';


const favoriteTableParams: IFavoriteTableParams = {
  user_id: `fb847d59-7745-43ae-b7d5-c5fec95d1efc`,
  hotel_id: `e8c1ee3c-0070-4902-b840-7cf94ea3c049`,
}

const favoriteEntityParams: IFavorite = {
  userId: favoriteTableParams.user_id,
  hotelId: favoriteTableParams.hotel_id,
  value: true,
}


describe(`Favorite Adapter Service`, () => {
  let service: FavoriteAdapterService;
  let favoritesDbTable: FavoritesDbTable;
  const favoriteEntity: FavoriteEntity = FavoriteEntity.create(favoriteEntityParams);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteAdapterService,
        {
          provide: FavoritesDbTable,
          useValue: {
            findOne: async () => favoriteTableParams,
            createOne: async () => favoriteTableParams,
            removeOne: async () => favoriteTableParams,
          }
        },
      ],
    }).compile();

    service = testModule.get<FavoriteAdapterService>(FavoriteAdapterService);
    favoritesDbTable = testModule.get<FavoritesDbTable>(FavoritesDbTable);
  });

  describe(`loadFavorite method`, () => {
    describe(`findOne method of FavoritesDbTable`, () => {
      it(`should call`, async () => {
        const findOne = jest.spyOn(favoritesDbTable, `findOne`).mockResolvedValue(favoriteTableParams);
        await service.loadFavorite(favoriteEntityParams.userId, favoriteEntityParams.hotelId);
        expect(findOne).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const findOne = jest.spyOn(favoritesDbTable, `findOne`).mockResolvedValue(favoriteTableParams);
        await service.loadFavorite(favoriteEntityParams.userId, favoriteEntityParams.hotelId);
        expect(findOne).toHaveBeenCalledWith(favoriteTableParams);
      });
    });

    describe(`create method of FavoriteEntity`, () => {
      it(`should call`, async () => {
        FavoriteEntity.create = jest.fn(FavoriteEntity.create);
        await service.loadFavorite(favoriteEntityParams.userId, favoriteEntityParams.hotelId);
        expect(FavoriteEntity.create).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        FavoriteEntity.create = jest.fn(FavoriteEntity.create);
        await service.loadFavorite(favoriteEntity.userId, favoriteEntity.hotelId);
        expect(FavoriteEntity.create).toHaveBeenCalledWith(favoriteEntityParams);
      });
    });

    it(`should return correct result if favorite entity didn't find `, async () => {
      const result: FavoriteEntity = await service.loadFavorite(favoriteEntity.userId, favoriteEntity.hotelId);
      expect(result).toEqual(favoriteEntity);
    });

    it(`should return correct result if favorite entity found `, async () => {
      jest.spyOn(favoritesDbTable, `findOne`).mockReturnValueOnce(null);
      const result: FavoriteEntity = await service.loadFavorite(favoriteEntity.userId, favoriteEntity.hotelId);
      expect(result).toEqual(FavoriteEntity.create({
        ...favoriteEntityParams,
        value: false,
      }));
    });
  });

  describe(`saveFavorite method`, () => {
    describe(`createOne method of FavoritesDbTable`, () => {
      it(`should call`, async () => {
        const createOne = jest.spyOn(favoritesDbTable, `createOne`).mockResolvedValue(favoriteTableParams);
        await service.saveFavorite(favoriteEntity);
        expect(createOne).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const createOne = jest.spyOn(favoritesDbTable, `createOne`).mockResolvedValue(favoriteTableParams);
        await service.saveFavorite(favoriteEntity);
        expect(createOne).toHaveBeenCalledWith(favoriteTableParams);
      });
    });

    it(`should return correct result`, async () => {
      const result: FavoriteEntity = await service.saveFavorite(favoriteEntity);
      expect(result).toBe(favoriteEntity);
    });
  });

  describe(`deleteFavorite method`, () => {
    describe(`removeOne method of FavoritesDbTable`, () => {
      it(`should call`, async () => {
        const removeOne = jest.spyOn(favoritesDbTable, `removeOne`).mockResolvedValue(favoriteTableParams);
        await service.deleteFavorite(favoriteEntity);
        expect(removeOne).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const removeOne = jest.spyOn(favoritesDbTable, `removeOne`).mockResolvedValue(favoriteTableParams);
        await service.deleteFavorite(favoriteEntity);
        expect(removeOne).toHaveBeenCalledWith(favoriteTableParams);
      });
    });

    it(`should return correct result`, async () => {
      const result: FavoriteEntity = await service.deleteFavorite(favoriteEntity);
      expect(result).toBe(favoriteEntity);
    });
  });
});