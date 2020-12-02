import { Test, TestingModule } from '@nestjs/testing';

import { cityServiceSymbol } from 'domains/services';

import { CityControllerService } from './city-controller.service';


describe('CityControllerService', () => {
  let service: CityControllerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityControllerService,
        {
          provide: cityServiceSymbol,
          useValue: {
            getCityList: async () => null,
          },
        },
      ],
    }).compile();

    service = module.get<CityControllerService>(CityControllerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
