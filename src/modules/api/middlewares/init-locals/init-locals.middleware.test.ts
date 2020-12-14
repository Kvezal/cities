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
import * as request from 'supertest';

import { IRequest } from '../middlewares.interface';
import { InitLocalsMiddleware } from './init-locals.middleware';


@Controller(`test`)
class TestController {
  constructor(@Inject(`test`) private _testService) {}

  @Get()
  public test(@Req() req: IRequest): void {
    this._testService.test(req);
  }
}

@Module({
  controllers: [TestController],
  providers: [
    {
      provide: `test`,
      useValue: {
        test: () => null,
      }
    }
  ]
})
class TestModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(InitLocalsMiddleware)
      .forRoutes(TestController);
  }
}

describe(`InitLocalsMiddleware`, () => {
  let app: INestApplication;
  let service;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile()

    app = testModule.createNestApplication();
    await app.init();
    service = testModule.get(`test`);
  });

  it(`should set empty locals object`, async () => {
    const test = jest.spyOn(service, `test`);

    await request(app.getHttpServer())
      .get(`/test`)
      .send();
    expect((test.mock.calls[0][0] as IRequest).locals).toEqual({});
  });
})