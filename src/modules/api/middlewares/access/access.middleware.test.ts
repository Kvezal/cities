import {
  Controller,
  Get,
  HttpStatus,
  INestApplication,
  MiddlewareConsumer,
  Module,
  NestModule,
  Req,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
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
import { JsonWebTokenExceptionFilter } from 'modules/api/filters';

import { IRequest } from '../middlewares.interface';
import { AccessMiddleware } from './access.middleware';


@Controller(`test`)
class TestController {
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public test(@Req() req: IRequest): void {
    return null;
  }
}

@Module({
  controllers: [TestController],
  providers: [
    {
      provide: authServiceSymbol,
      useValue: {
        checkAccessToken: async () => null,
      }
    },
    {
      provide: APP_FILTER,
      useClass: JsonWebTokenExceptionFilter,
    }
  ]
})
class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(cookieParser(), AccessMiddleware)
      .forRoutes(TestController);
  }
}

describe(`AccessMiddleware`, () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile()
    app = testModule.createNestApplication();
    await app.init();
    authService = testModule.get<AuthService>(authServiceSymbol);
  });

  describe(`checkAccessToken method of AuthService`, () => {
    it(`shouldn't call if access token is undefined`, async () => {
      authService.checkAccessToken = jest.fn(authService.checkAccessToken).mockImplementationOnce(async () => true);
      await request(app.getHttpServer())
        .get(`/test`)
        .send();
      expect(authService.checkAccessToken).toHaveBeenCalledTimes(0);
    });

    it(`should call`, async () => {
      authService.checkAccessToken = jest.fn(authService.checkAccessToken).mockImplementationOnce(async () => true);
      await request(app.getHttpServer())
        .get(`/test`)
        .set({cookie: `access-token=test`})
        .send();
      expect(authService.checkAccessToken).toHaveBeenCalledTimes(1);
    });

    it(`should call with params`, async () => {
      authService.checkAccessToken = jest.fn(authService.checkAccessToken).mockImplementationOnce(async () => true);
      await request(app.getHttpServer())
        .get(`/test`)
        .set({cookie: `access-token=test`})
        .send();
      expect(authService.checkAccessToken).toHaveBeenCalledWith(`test`);
    });
  });

  describe(`should be correct results`, () => {
    it(`status code should be 401 if checkAccessToken result equal "false"`, async () => {
      authService.checkAccessToken = jest.fn(authService.checkAccessToken).mockImplementationOnce(async () => false);
      const result = await request(app.getHttpServer())
        .get(`/test`)
        .send();
      await expect(result.status).toBe(HttpStatus.UNAUTHORIZED);
    });

    it(`status code should be 401 if access token is undefined`, async () => {
      authService.checkAccessToken = jest.fn(authService.checkAccessToken).mockImplementationOnce(async () => false);
      const result = await request(app.getHttpServer())
        .get(`/test`)
        .send();
      await expect(result.status).toBe(HttpStatus.UNAUTHORIZED);
    });

    it(`status code should be 200 if checkAccessToken result equal "true"`, async () => {
      authService.checkAccessToken = jest.fn(authService.checkAccessToken).mockImplementationOnce(async () => true);
      const result = await request(app.getHttpServer())
        .get(`/test`)
        .set({cookie: `access-token=test`})
        .send();
      await expect(result.status).toBe(HttpStatus.OK);
    });
  });
})