import {
  HttpStatus,
  INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';

import {
  CommentEntity,
  IComment,
  IJsonWebTokenParams,
} from 'domains/entities';
import {
  authServiceSymbol,
  commentServiceSymbol,
} from 'domains/services';

import { CommentController } from './comment.controller';
import { CommentControllerService } from './comment-controller.service';
import {
  EJsonWebTokenType,
  JsonWebTokenError,
} from 'domains/exceptions';
import {
  AccessMiddleware,
  DecodeJsonWebTokenMiddleware,
  InitLocalsMiddleware,
} from 'modules/api/middlewares';
import { EApiRouteName } from 'modules/api/controllers/api-route-names.enum';


const jsonWebTokenParams: IJsonWebTokenParams = {
  id: `008131ec-cb07-499a-86e4-6674afa31532`,
  name: `name`,
  email: `email@gmail.com`,
  image: null,
};

const commentParams: IComment = {
  text: Array(20).fill(`i`).join(``),
  hotelId: `000e1960-fa36-4a99-b8c0-c4eb96e823e3`,
  rating: 4,
  userId: jsonWebTokenParams.id
};

const commentEntityParams: IComment = {
  id: `005d67a0-58c1-40a5-a664-53ed22206a6e`,
  text: commentParams.text,
  createdAt: new Date(),
  hotelId: commentParams.hotelId,
  userId: jsonWebTokenParams.id,
  rating: commentParams.rating,
};


@Module({
  controllers: [CommentController],
  providers: [
    CommentControllerService,
    {
      provide: commentServiceSymbol,
      useValue: {
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
          .set(`Cookie`, `access-token=${accessToken}`);
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
          .set(`Cookie`, `access-token=${accessToken}`);
        expect(result.status).toBe(HttpStatus.BAD_REQUEST);
      });

      it(`status code should be 200`, async () => {
        const result = await request(app.getHttpServer())
          .post(commentUrl)
          .send(commentParams)
          .set(`Cookie`, `access-token=${accessToken}`);
        expect(result.status).toBe(HttpStatus.OK);
      });

      describe(`createHotelComment method of CommentControllerService`, () => {
        it(`should call`, async () => {
          const createHotelComment = jest.spyOn(service, `createHotelComment`);
          await request(app.getHttpServer())
            .post(commentUrl)
            .send(commentParams)
            .set(`Cookie`, `access-token=${accessToken}`);
          expect(createHotelComment).toHaveBeenCalledTimes(1);
        });

        it(`should call with params`, async () => {
          const createHotelComment = jest.spyOn(service, `createHotelComment`);
          const accessToken = `test`;
          await request(app.getHttpServer())
            .post(commentUrl)
            .send(commentParams)
            .set(`Cookie`, `access-token=${accessToken}`);
          expect(createHotelComment).toHaveBeenCalledWith(commentParams);
        });
      });
    });
  });
});
