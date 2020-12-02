import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { cityServiceSymbol } from 'domains/services';

import { CityController } from './city.controller';
import { CityControllerService } from './city-controller.service';


describe('CityController', () => {
  let app: INestApplication;
  let controller: CityController;
  let service: CityControllerService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        CityControllerService,
        {
          provide: cityServiceSymbol,
          useValue: {
            getCityList: async () => [],
          },
        },
      ],
    }).compile();
    app = testModule.createNestApplication();
    await app.init();
    controller = testModule.get<CityController>(CityController);
    service = testModule.get<CityControllerService>(CityControllerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(`GET`, () => {
    describe(`/api/city end point`, () => {
      const cityUrl = `/api/city`;

      it(`status code should be 200`, async () => {
        const result = await request(app.getHttpServer())
          .get(cityUrl)
          .send();
        expect(result.status).toBe(HttpStatus.OK);
      });

      describe(`getCityList method of CityControllerService`, () => {
        it(`should call`, async () => {
          const getCityList = jest.spyOn(service, `getCityList`);
          await request(app.getHttpServer())
            .get(cityUrl)
            .send();
          expect(getCityList).toHaveBeenCalledTimes(1);
        });

        it(`should call without params`, async () => {
          const getCityList = jest.spyOn(service, `getCityList`);
          await request(app.getHttpServer())
            .get(cityUrl)
            .send();
          expect(getCityList).toHaveBeenCalledWith();
        });
      });
    });
  });
});
