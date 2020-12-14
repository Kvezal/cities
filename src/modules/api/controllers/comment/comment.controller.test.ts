import {
  HttpStatus,
  INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';

import {
  CommentEntity,
  IComment,
  IHotel,
  IJsonWebTokenParams,
  IUser,
} from 'domains/entities';
import {
  EJsonWebTokenType,
  JsonWebTokenError,
} from 'domains/exceptions';
import {
  authServiceSymbol,
  commentServiceSymbol,
} from 'domains/services';
import { JsonWebTokenExceptionFilter } from 'modules/api/filters';
import { CommentDto } from 'modules/api/interfaces';
import {
  AccessMiddleware,
  DecodeJsonWebTokenMiddleware,
  InitLocalsMiddleware,
} from 'modules/api/middlewares';


import { EApiRouteName } from '../api-route-names.enum';
import { CommentController } from './comment.controller';
import { CommentControllerService } from './comment-controller.service';


const userParams: IUser = {
  id: `008131ec-cb07-499a-86e4-6674afa31532`,
  name: `name`,
  email: `email@gmail.com`,
  password: `password`,
  image: {
    id: `1`,
    title: `title`,
  },
  type: {
    id: `1`,
    title: `title`,
  },
};

const jsonWebTokenParams: IJsonWebTokenParams = {
  id: userParams.id,
  name: userParams.name,
  email: userParams.email,
  image: userParams.image.title,
};

const hotelParams: IHotel = {
  id: `092841ec-cb07-499a-86e4-6674afa31532`,
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
  host: userParams,
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
  favorites: [userParams],
};

const commentParams: CommentDto = {
  text: Array(20).fill(`i`).join(``),
  hotelId: hotelParams.id,
  rating: 4,
};

const commentEntityParams: IComment = {
  id: `005d67a0-58c1-40a5-a664-53ed22206a6e`,
  text: commentParams.text,
  createdAt: new Date(),
  hotel: hotelParams,
  user: userParams,
  rating: commentParams.rating,
};


@Module({
  controllers: [CommentController],
  providers: [
    CommentControllerService,
    {
      provide: commentServiceSymbol,
      useValue: {
        getHotelCommentList: async () => [CommentEntity.create(commentEntityParams)],
        createHotelComment: async () => CommentEntity.create(commentEntityParams),
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
    )
      .forRoutes(CommentController);

    consumer.apply(AccessMiddleware)
      .forRoutes({path: EApiRouteName.COMMENT, method: RequestMethod.POST})
  }
}

describe('CommentController', () => {
  let app: INestApplication;
  let controller: CommentController;
  let service: CommentControllerService;
  const accessToken = `test`;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    app = testModule.createNestApplication();
    await app.init();
    controller = testModule.get<CommentController>(CommentController);
    service = testModule.get<CommentControllerService>(CommentControllerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(`GET`, () => {
    describe(`/api/comment`, () => {
      const commentUrl = `/api/comment?hotelId=${hotelParams.id}`;

      it(`status code should be 200`, async () => {
        const result = await request(app.getHttpServer())
          .get(commentUrl)
          .send(commentParams);
        expect(result.status).toBe(HttpStatus.OK);
      });
    })
  });

  describe(`POST`, () => {
    describe(`/api/comment`, () => {
      const commentUrl = `/api/comment`;

      it(`status code should be 401 if user unauthorized`, async () => {
        jest.spyOn(service, `createHotelComment`).mockImplementationOnce(async () => {
          throw new JsonWebTokenError({
            type: EJsonWebTokenType.INVALID,
            message: `test`,
          });
        });
        const result = await request(app.getHttpServer())
          .post(commentUrl)
          .send(commentParams)
        expect(result.status).toBe(HttpStatus.UNAUTHORIZED);
      });

      it.each([
        `text`,
        `hotelId`,
        `rating`,
      ])(`status code should be 400 if %p params isn't existed`, async (paramName: string) => {
        const params = Object.assign({}, commentParams);
        delete params[paramName];
        const result = await request(app.getHttpServer())
          .post(commentUrl)
          .send(params)
          .set({ cookie: `access-token=${accessToken}` });
        expect(result.status).toBe(HttpStatus.BAD_REQUEST);
      });

      it(`status code should be 201`, async () => {
        const result = await request(app.getHttpServer())
          .post(commentUrl)
          .send(commentParams)
          .set({ cookie: `access-token=${accessToken}` });
        expect(result.status).toBe(HttpStatus.CREATED);
      });

      describe(`createHotelComment method of CommentControllerService`, () => {
        it(`should call`, async () => {
          const createHotelComment = jest.spyOn(service, `createHotelComment`);
          await request(app.getHttpServer())
            .post(commentUrl)
            .send(commentParams)
            .set({ cookie: `access-token=${accessToken}` });
          expect(createHotelComment).toHaveBeenCalledTimes(1);
        });

        it(`should call with params`, async () => {
          const createHotelComment = jest.spyOn(service, `createHotelComment`);
          const accessToken = `test`;
          await request(app.getHttpServer())
            .post(commentUrl)
            .send(commentParams)
            .set({ cookie: `access-token=${accessToken}` });
          expect(createHotelComment).toHaveBeenCalledWith({
            ...commentParams,
            userId: userParams.id,
          });
        });
      });
    });
  });
});
