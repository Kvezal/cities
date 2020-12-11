import {
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import * as request from 'supertest';

import { hotelServiceSymbol } from 'domains/services';

import { HotelController } from './hotel.controller';
import { HotelControllerService } from './hotel-controller.service';


describe('HotelController', () => {
  let app: INestApplication;
  let controller: HotelController;
  let service: HotelControllerService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      controllers: [HotelController],
      providers: [
        HotelControllerService,
        {
          provide: hotelServiceSymbol,
          useValue: {
            getHotelList: async () => [],
            getHotelById: async () => null,
            getNearbyHotelList: async () => [],
          },
        },
      ],
    }).compile();
    app = testModule.createNestApplication();
    await app.init();
    controller = testModule.get<HotelController>(HotelController);
    service = testModule.get<HotelControllerService>(HotelControllerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(`GET`, () => {
    describe(`/api/hotel end-point`, () => {
      const hotelUrl = `/api/hotel`;

      describe(`"hotelId" query params`, () => {
        it(`status code should be 200`, async () => {
          const result = await request(app.getHttpServer())
            .get(`${hotelUrl}?hotelId=test`)
            .send();
          expect(result.status).toBe(HttpStatus.OK);
        });

        describe(`getHotelList method of HotelControllerService`, () => {
          it(`should call`, async () => {
            const getHotelList = jest.spyOn(service, `getHotelList`);
            await request(app.getHttpServer())
              .get(`${hotelUrl}?hotelId=test`)
              .send();
            expect(getHotelList).toHaveBeenCalledTimes(1);
          });

          it(`should call with params`, async () => {
            const getHotelList = jest.spyOn(service, `getHotelList`);
            await request(app.getHttpServer())
              .get(`${hotelUrl}?hotelId=test`)
              .send();
            expect(getHotelList).toHaveBeenCalledWith({ hotelId: `test` });
          });
        });
      });

      describe(`"cityId" query params`, () => {
        it(`status code should be 200`, async () => {
          const result = await request(app.getHttpServer())
            .get(`${hotelUrl}?cityId=test`)
            .send();
          expect(result.status).toBe(HttpStatus.OK);
        });

        describe(`getHotelList method of HotelControllerService`, () => {
          it(`should call`, async () => {
            const getHotelList = jest.spyOn(service, `getHotelList`);
            await request(app.getHttpServer())
              .get(`${hotelUrl}?cityId=test`)
              .send();
            expect(getHotelList).toHaveBeenCalledTimes(1);
          });

          it(`should call with params`, async () => {
            const getHotelList = jest.spyOn(service, `getHotelList`);
            await request(app.getHttpServer())
              .get(`${hotelUrl}?cityId=test`)
              .send();
            expect(getHotelList).toHaveBeenCalledWith({ cityId: `test` });
          });
        });
      });
    });

    describe(`/api/hotel/:hotelId`, () => {
      const hotelUrl = `/api/hotel/test`;

      it(`status code should be 200`, async () => {
        const result = await request(app.getHttpServer())
          .get(hotelUrl)
          .send();
        expect(result.status).toBe(HttpStatus.OK);
      });

      describe(`getHotelById method of HotelControllerService`, () => {
        it(`should call`, async () => {
          const getHotelList = jest.spyOn(service, `getHotelById`);
          await request(app.getHttpServer())
            .get(hotelUrl)
            .send();
          expect(getHotelList).toHaveBeenCalledTimes(1);
        });

        it(`should call with params`, async () => {
          const getHotelList = jest.spyOn(service, `getHotelById`);
          await request(app.getHttpServer())
            .get(hotelUrl)
            .send();
          expect(getHotelList).toHaveBeenCalledWith(`test`);
        });
      });
    });
  });
});
