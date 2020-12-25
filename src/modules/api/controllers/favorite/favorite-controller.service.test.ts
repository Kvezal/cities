import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import {
  FavoriteService,
  favoriteServiceSymbol,
} from 'domains/services';

import { FavoriteControllerService } from './favorite-controller.service';
import {
  FavoriteEntity,
  IFavorite,
  IJsonWebTokenParams,
} from 'domains/entities';


const jsonWebTokenParams: IJsonWebTokenParams = {
  id: `008131ec-cb07-499a-86e4-6674afa31532`,
  name: `name`,
  email: `email@gmail.com`,
  image: null,
};

const favoriteParams: IFavorite = {
  hotelId: `008131ec-cb07-499a-86e4-6674afa31532`,
  userId: `008131ec-cb07-499a-86e4-6674afa31532`,
  value: false,
}

describe('FavoriteControllerService', () => {
  let service: FavoriteControllerService;
  let favoriteService: FavoriteService;
  const favoriteEntity: FavoriteEntity = FavoriteEntity.create(favoriteParams);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteControllerService,
        {
          provide: favoriteServiceSymbol,
          useValue: {
            toggleFavorite: async () => favoriteEntity,
          },
        },
      ],
    }).compile();

    service = testModule.get<FavoriteControllerService>(FavoriteControllerService);
    favoriteService = testModule.get<FavoriteService>(favoriteServiceSymbol);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`toggleFavoriteStatus method`, () => {
    describe(`toggleFavorite method of FavoriteService`, () => {
      it(`should call`, async () => {
        const toggleFavoriteStatus = jest.spyOn(favoriteService, `toggleFavorite`);
        await service.toggleFavoriteStatus(jsonWebTokenParams.id, favoriteParams.hotelId);
        expect(toggleFavoriteStatus).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const toggleFavoriteStatus = jest.spyOn(favoriteService, `toggleFavorite`);
        await service.toggleFavoriteStatus(jsonWebTokenParams.id, favoriteParams.hotelId);
        expect(toggleFavoriteStatus).toHaveBeenCalledWith(favoriteParams.userId, favoriteParams.hotelId);
      });
    });

    describe(`transformEntityToOutputData method of HotelControllerService`, () => {
      it(`should call`, async () => {
        service.transformEntityToOutputData = jest.fn(service.transformEntityToOutputData);
        await service.toggleFavoriteStatus(jsonWebTokenParams.id, favoriteParams.hotelId);
        expect(service.transformEntityToOutputData).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        service.transformEntityToOutputData = jest.fn(service.transformEntityToOutputData);
        await service.toggleFavoriteStatus(jsonWebTokenParams.id, favoriteParams.hotelId);
        expect(service.transformEntityToOutputData).toHaveBeenCalledWith(favoriteEntity);
      });
    });

    it(`should return correct result`, async () => {
      const result = await service.toggleFavoriteStatus(jsonWebTokenParams.id, favoriteParams.hotelId);
      expect(result).toEqual(favoriteParams);
    });
  });

  it(`transformEntityToOutputData method should return correct result`, async () => {
    const result = await service.transformEntityToOutputData(favoriteEntity);
    expect(result).toEqual(favoriteParams);
  });
});
