import { Test, TestingModule } from '@nestjs/testing';

import { CityService, cityServiceSymbol } from 'domains/services';
import { CityControllerService } from './city-controller.service';
import { CityMapper } from 'modules/adapters';
import { CityEntity, ICity } from 'domains/entities';


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

    describe(`mapToOrmEntity method of CityMapper`, () => {
      it(`should call`, async () => {
        CityMapper.mapToOrmEntity = jest.fn(CityMapper.mapToOrmEntity);
        await service.getCityList();
        expect(CityMapper.mapToOrmEntity).toHaveBeenCalledTimes(3);
      });

      it(`should call with params`, async () => {
        CityMapper.mapToOrmEntity = jest.fn(CityMapper.mapToOrmEntity);
        await service.getCityList();
        expect(CityMapper.mapToOrmEntity).toHaveBeenNthCalledWith(1, cityEntity);
        expect(CityMapper.mapToOrmEntity).toHaveBeenNthCalledWith(2, cityEntity);
        expect(CityMapper.mapToOrmEntity).toHaveBeenNthCalledWith(3, cityEntity);
      });
    });

    it(`should return correct result`, async () => {
      CityMapper.mapToOrmEntity = jest.fn(CityMapper.mapToOrmEntity).mockReturnValue(cityOrmEntity);
      const result = await service.getCityList();
      expect(result).toEqual([cityOrmEntity, cityOrmEntity, cityOrmEntity]);
    });
  });
});
