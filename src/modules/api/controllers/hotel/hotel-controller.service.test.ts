import { Test, TestingModule } from '@nestjs/testing';

import { HotelControllerService } from './hotel-controller.service';
import { hotelServiceSymbol } from 'domains/services';


describe('HotelControllerService', () => {
  let service: HotelControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<HotelControllerService>(HotelControllerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
