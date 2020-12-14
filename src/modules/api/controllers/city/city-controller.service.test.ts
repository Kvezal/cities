import { Test, TestingModule } from '@nestjs/testing';

import { CityService, cityServiceSymbol } from 'domains/services';
import { CityControllerService } from './city-controller.service';
import { CityMapper } from 'modules/adapters';
import { CityEntity, ICity } from 'domains/entities';
import { CityOutput } from 'modules/api/interfaces';


const cityParams: ICity = {
  id: `1`,
  title: `title`,
  location: {
    id: `1`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
};

describe('CityControllerService', () => {
  let service: CityControllerService;
  let cityService: CityService;
  const cityEntity = CityEntity.create(cityParams);
  const cityOrmEntity = CityMapper.mapToOrmEntity(cityEntity);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        CityControllerService,
        {
          provide: cityServiceSymbol,
          useValue: {
            getCityList: async () => Array(3).fill(cityEntity),
          },
        },
      ],
    }).compile();

    service = testModule.get<CityControllerService>(CityControllerService);
    cityService = testModule.get<CityService>(cityServiceSymbol);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`getCityList method`, () => {
    describe(`getCityList method of CityService`, () => {
      it(`should call`, async () => {
        const getCityList = jest.spyOn(cityService, `getCityList`);
        await service.getCityList();
        expect(getCityList).toHaveBeenCalledTimes(1);
      });

      it(`should call without params`, async () => {
        const getCityList = jest.spyOn(cityService, `getCityList`);
        await service.getCityList();
        expect(getCityList).toHaveBeenCalledWith();
      });
    });

    describe(`transformEntityToOutputData method of CityControllerService`, () => {
      it(`should call`, async () => {
        service.transformEntityToOutputData = jest.fn(service.transformEntityToOutputData);
        await service.getCityList();
        expect(service.transformEntityToOutputData).toHaveBeenCalledTimes(3);
      });

      it(`should call with params`, async () => {
        service.transformEntityToOutputData = jest.fn(service.transformEntityToOutputData);
        await service.getCityList();
        expect(service.transformEntityToOutputData).toHaveBeenNthCalledWith(1, cityEntity);
        expect(service.transformEntityToOutputData).toHaveBeenNthCalledWith(2, cityEntity);
        expect(service.transformEntityToOutputData).toHaveBeenNthCalledWith(3, cityEntity);
      });
    });

    it(`should return correct result`, async () => {
      CityMapper.mapToOrmEntity = jest.fn(CityMapper.mapToOrmEntity).mockReturnValue(cityOrmEntity);
      const result = await service.getCityList();
      expect(result).toEqual([cityOrmEntity, cityOrmEntity, cityOrmEntity]);
    });
  });

  describe(`transformEntityToOutputData method`, () => {
    it(`should return correct result`, () => {
      const result: CityOutput = service.transformEntityToOutputData(cityParams);
      expect(result).toEqual(cityParams);
    });
  })
});
