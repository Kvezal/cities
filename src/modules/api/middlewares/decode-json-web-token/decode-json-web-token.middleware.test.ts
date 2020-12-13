import {
  Controller,
  Get,
  INestApplication,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  Req,
} from '@nestjs/common';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';

import {
  AuthService,
  authServiceSymbol,
} from 'domains/services';

import { InitLocalsMiddleware } from '../init-locals';
import { IRequest } from '../middlewares.interface';
import { DecodeJsonWebTokenMiddleware } from './decode-json-web-token.middleware';
import { IJsonWebTokenParams } from 'domains/entities';


const jsonWebTokenParams: IJsonWebTokenParams = {
  id: `1`,
  name: `name`,
  email: `email@gmail.com`,
  image: null,
};

@Controller(`test`)
class TestController {
  constructor(@Inject(`test-service`) private readonly _testService) {
  }

  @Get()
  public test(@Req() req: IRequest): void {
    return this._testService.testRequest(req);
  }
}

@Module({
  controllers: [TestController],
  providers: [
    {
      provide: authServiceSymbol,
      useValue: {
        decodeAccessToken: async () => jsonWebTokenParams,
      },
    },
    {
      provide: `test-service`,
      useValue: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        testRequest: (req: IRequest): IRequest => null,
      },
    }
  ]
})
class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(cookieParser(), InitLocalsMiddleware, DecodeJsonWebTokenMiddleware)
      .forRoutes(TestController);
  }
}

describe(`DecodeJsonWebTokenMiddleware`, () => {
  let app: INestApplication;
  let authService: AuthService;
  let testService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile()
    app = testModule.createNestApplication();
    await app.init();
    authService = testModule.get<AuthService>(authServiceSymbol);
    testService = testModule.get(`test-service`);
  });

  describe(`checkAccessToken method of AuthService`, () => {
    const accessToken = `test`;

    it(`should call`, async () => {
      authService.decodeAccessToken = jest.fn(authService.decodeAccessToken)
        .mockImplementationOnce(async () => null);
      await request(app.getHttpServer())
        .get(`/test`)
        .set({cookie: `access-token=${accessToken}`})
        .send();
      expect(authService.decodeAccessToken).toHaveBeenCalledTimes(1);
    });

    it(`should call with params`, async () => {
      authService.decodeAccessToken = jest.fn(authService.decodeAccessToken);
      await request(app.getHttpServer())
        .get(`/test`)
        .set({cookie: `access-token=${accessToken}`})
        .send();
      expect(authService.decodeAccessToken).toHaveBeenCalledWith(accessToken);
    });

    it(`should have userId`, async () => {
      const test = jest.spyOn(testService, `testRequest`);
      await request(app.getHttpServer())
        .get(`/test`)
        .set({cookie: `access-token=${accessToken}`})
        .send();
      expect((test.mock.calls[0][0] as IRequest).locals).toEqual({
        userId: jsonWebTokenParams.id,
      });
    });
  });
});