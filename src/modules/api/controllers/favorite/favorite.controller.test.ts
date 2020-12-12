import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';

import { IFavorite, IJsonWebTokenParams } from 'domains/entities';
import { authServiceSymbol, favoriteServiceSymbol } from 'domains/services';

import { FavoriteController } from './favorite.controller';
import { FavoriteControllerService } from './favorite-controller.service';
import { EJsonWebTokenType, JsonWebTokenError } from '../../../../domains/exceptions/json-web-token';


const jsonWebTokenParams: IJsonWebTokenParams = {
  id: `008131ec-cb07-499a-86e4-6674afa31532`,
  name: `name`,
  email: `email@gmail.com`,
  image: null,
};

const favoriteParams: IFavorite = {
  value: true,
  userId: `1`,
  hotelId: `1`,
};


describe('FavoriteController', () => {
  let app: INestApplication;
  let service: FavoriteControllerService;
  let controller: FavoriteController;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      controllers: [
        FavoriteController,
      ],
      providers: [
        FavoriteControllerService,
        {
          provide: favoriteServiceSymbol,
          useValue: {
            getFavoriteHotelList: async () => [],
            toggleFavoriteStateOfHotelForUser: async () => favoriteParams,
          },
        },
        {
          provide: authServiceSymbol,
          useValue: {
            decodeAccessToken: async () => jsonWebTokenParams,
          },
        },
      ],
    }).compile();
    app = testModule.createNestApplication();
    app.use(cookieParser());
    await app.init();
    controller = testModule.get<FavoriteController>(FavoriteController);
    service = testModule.get<FavoriteControllerService>(FavoriteControllerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(`POST`, () => {
    describe(`/api/favorite/hotelId`, () => {
      const favoriteUrl = `/api/favorite?hotelId=test`;

      it(`status code should be 200`, async () => {
        const result = await request(app.getHttpServer())
          .post(favoriteUrl)
          .send()
          .set(`Cookie`, `access-token=test`);
        expect(result.status).toBe(HttpStatus.OK);
      });

      it(`status code should be 401 if user is unauthorized`, async () => {
        jest.spyOn(service, `toggleFavoriteStatus`).mockImplementationOnce(async () => {
          throw new JsonWebTokenError({
            type: EJsonWebTokenType.IS_NOT_EXISTED,
            message: `test`,
          });
        });
        const result = await request(app.getHttpServer())
          .post(favoriteUrl)
          .send();
        expect(result.status).toBe(HttpStatus.UNAUTHORIZED);
      });

      describe(`toggleFavoriteStatus method of FavoriteControllerService`, () => {
        it(`should call`, async () => {
          const toggleFavoriteStatus = jest.spyOn(service, `toggleFavoriteStatus`).mockImplementationOnce(async () => null);
          await request(app.getHttpServer())
            .post(favoriteUrl)
            .send()
            .set(`Cookie`, `access-token=test`);
          expect(toggleFavoriteStatus).toHaveBeenCalledTimes(1);
        });

        it(`should call with params`, async () => {
          const toggleFavoriteStatus = jest.spyOn(service, `toggleFavoriteStatus`).mockImplementationOnce(async () => null);
          const accessToken = `test`;
          await request(app.getHttpServer())
            .post(favoriteUrl)
            .send()
            .set(`Cookie`, `access-token=${accessToken}`);
          expect(toggleFavoriteStatus).toHaveBeenCalledWith(`test`, accessToken);
        });
      });
    });
  });
});
