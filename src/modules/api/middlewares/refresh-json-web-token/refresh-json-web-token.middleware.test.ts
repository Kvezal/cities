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
import { RefreshJsonWebTokenMiddleware } from './refresh-json-web-token.middleware';
import {
  IJsonWebTokenParams,
  JsonWebTokenEntity,
} from 'domains/entities';
import { ConfigService } from 'modules/config';


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
      provide: ConfigService,
      useValue: {
        getGlobalEnvironmentVariable: () => `10000`,
      },
    },
    {
      provide: authServiceSymbol,
      useValue: {
        refreshToken: async () => null,
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
    consumer.apply(cookieParser(), InitLocalsMiddleware, RefreshJsonWebTokenMiddleware)
      .forRoutes(TestController);
  }
}

describe(`RefreshJsonWebTokenMiddleware`, () => {
  let app: INestApplication;
  let authService: AuthService;
  let testService;
  let jsonWebTokenEntity: JsonWebTokenEntity;
  const refreshToken = `test`;

  beforeEach(async () => {
    jsonWebTokenEntity = await JsonWebTokenEntity.generate(jsonWebTokenParams);
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile()
    app = testModule.createNestApplication();
    await app.init();
    authService = testModule.get<AuthService>(authServiceSymbol);
    testService = testModule.get(`test-service`);
  });

  describe(`refreshToken method of AuthService`, () => {
    it(`shouldn't call if refreshToken is undefined`, async () => {
      authService.refreshToken = jest.fn(authService.refreshToken)
        .mockImplementationOnce(async () => jsonWebTokenEntity);
      await request(app.getHttpServer())
        .get(`/test`)
        .send();
      expect(authService.refreshToken).toHaveBeenCalledTimes(0);
    });

    it(`should call`, async () => {
      authService.refreshToken = jest.fn(authService.refreshToken)
        .mockImplementationOnce(async () => jsonWebTokenEntity);
      await request(app.getHttpServer())
        .get(`/test`)
        .set({cookie: `refresh-token=${refreshToken}`})
        .send();
      expect(authService.refreshToken).toHaveBeenCalledTimes(1);
    });

    it(`should call with params`, async () => {
      authService.refreshToken = jest.fn(authService.refreshToken)
        .mockImplementationOnce(async () => jsonWebTokenEntity);
      await request(app.getHttpServer())
        .get(`/test`)
        .set({cookie: `refresh-token=${refreshToken}`})
        .send();
      expect(authService.refreshToken).toHaveBeenCalledWith(refreshToken);
    });
  });

  describe(`decodeAccessToken method of AuthService`, () => {
    it(`shouldn't call if refreshToken is undefined`, async () => {
      authService.decodeAccessToken = jest.fn(authService.decodeAccessToken)
        .mockImplementationOnce(async () => jsonWebTokenParams);
      await request(app.getHttpServer())
        .get(`/test`)
        .send();
      expect(authService.decodeAccessToken).toHaveBeenCalledTimes(0);
    });

    it(`should call`, async () => {
      authService.decodeAccessToken = jest.fn(authService.decodeAccessToken)
        .mockImplementationOnce(async () => jsonWebTokenParams);
      await request(app.getHttpServer())
        .get(`/test`)
        .set({cookie: `refresh-token=${refreshToken}`})
        .send();
      expect(authService.decodeAccessToken).toHaveBeenCalledTimes(1);
    });

    it(`should call with params`, async () => {
      authService.refreshToken = jest.fn(authService.refreshToken)
        .mockImplementationOnce(async () => jsonWebTokenEntity);
      authService.decodeAccessToken = jest.fn(authService.decodeAccessToken)
        .mockImplementationOnce(async () => jsonWebTokenParams);
      await request(app.getHttpServer())
        .get(`/test`)
        .set({cookie: `refresh-token=${refreshToken}`})
        .send();
      expect(authService.decodeAccessToken).toHaveBeenCalledWith(jsonWebTokenEntity.accessToken);
    });
  });

  describe(`should return correct result`, () => {
    it(`should have userId if refreshToken isn't undefined`, async () => {
      testService.testRequest = jest.fn(testService.testRequest);
      authService.refreshToken = jest.fn(authService.refreshToken)
        .mockImplementationOnce(async () => jsonWebTokenEntity);
      authService.decodeAccessToken = jest.fn(authService.decodeAccessToken)
        .mockImplementationOnce(async () => jsonWebTokenParams);
      await request(app.getHttpServer())
        .get(`/test`)
        .set({cookie: `refresh-token=${refreshToken}`})
        .send();
      expect((testService.testRequest.mock.calls[0][0] as IRequest).locals.userId)
        .toBe(jsonWebTokenParams.id);
    });

    it(`should have userId if refreshToken is undefined`, async () => {
      testService.testRequest = jest.fn(testService.testRequest);
      await request(app.getHttpServer())
        .get(`/test`)
        .send();
      expect((testService.testRequest.mock.calls[0][0] as IRequest).locals.userId)
        .toBeUndefined();
    });
  });
})