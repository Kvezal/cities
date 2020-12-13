import {
  HttpStatus,
  INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';

import {
  IHotel,
  IJsonWebTokenParams,
} from 'domains/entities';
import {
  authServiceSymbol,
  hotelServiceSymbol,
} from 'domains/services';

import { FavoriteController } from './favorite.controller';
import { FavoriteControllerService } from './favorite-controller.service';
import {
  EJsonWebTokenType,
  JsonWebTokenError,
} from 'domains/exceptions/json-web-token';
import {
  AccessMiddleware,
  DecodeJsonWebTokenMiddleware,
  InitLocalsMiddleware,
} from 'modules/api/middlewares';
import { APP_FILTER } from '@nestjs/core';
import { JsonWebTokenExceptionFilter } from 'modules/api/filters';


const jsonWebTokenParams: IJsonWebTokenParams = {
  id: `008131ec-cb07-499a-86e4-6674afa31532`,
  name: `name`,
  email: `email@gmail.com`,
  image: null,
};

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

@Module({
  controllers: [
    FavoriteController,
  ],
  providers: [
    FavoriteControllerService,
    {
      provide: hotelServiceSymbol,
      useValue: {
        getHotelList: async () => [],
        toggleHotelFavoriteState: async () => hotelParams,
      },
    },
    {
      provide: authServiceSymbol,
      useValue: {
        checkAccessToken: () => true,
        decodeAccessToken: async () => jsonWebTokenParams,
      },
    },
    {
      provide: APP_FILTER,
      useClass: JsonWebTokenExceptionFilter,
    }
  ],
})
class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(
      cookieParser(),
      InitLocalsMiddleware,
      DecodeJsonWebTokenMiddleware,
      AccessMiddleware
    )
      .forRoutes(FavoriteController)
  }
}


describe('FavoriteController', () => {
  let app: INestApplication;
  let service: FavoriteControllerService;
  let controller: FavoriteController;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    app = testModule.createNestApplication();
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
          expect(toggleFavoriteStatus).toHaveBeenCalledWith(jsonWebTokenParams.id, `test`);
        });
      });
    });
  });
});
