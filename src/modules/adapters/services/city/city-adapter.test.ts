import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import { CityEntity } from 'domains/entities';
import { CityMapper } from 'modules/adapters/mappers';
import { CitiesDbTable } from 'modules/db';
import { ICityTableParams } from 'modules/db/interfaces';

import { CityAdapterService } from './city-adapter.service';


const cityTableParams: ICityTableParams = {
  id: `000554d8-6d39-456d-96a2-9320d8bca76d`,
  title: `title`,
  location: {
    id: `934928b7-90e5-4482-8967-941b84b08994`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
};

describe(`City Adapter Service`, () => {
  let service: CityAdapterService;
  let repositoryService: CitiesDbTable;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        CityAdapterService,
        {
          provide: CitiesDbTable,
          useValue: {
            findOne: async () => null,
            findAll: async () => null,
          }
        },
      ],
    }).compile();
    service = testModule.get<CityAdapterService>(CityAdapterService);
    repositoryService = testModule.get<CitiesDbTable>(CitiesDbTable);
  });

  it(`should define service`, () => {
    expect(service).toBeDefined();
  });

  describe(`loadCityList method`, () => {
    const cityTableParamsList: ICityTableParams[] = [
      cityTableParams,
      {
        ...cityTableParams,
        id: `35b1508b-fca3-4ee9-b8c9-151660abf438`,
      }
    ];

    it(`should call find method of repository`, async () => {
      const findAll = jest.spyOn(repositoryService, `findAll`).mockResolvedValueOnce(cityTableParamsList);
      await service.loadCityList();
      expect(findAll).toHaveBeenCalledTimes(1);
    });

    it(`should call mapToDomain method of CityMapper`, async () => {
      jest.spyOn(repositoryService, `findAll`).mockResolvedValueOnce(cityTableParamsList);
      CityMapper.mapToDomain = jest.fn(CityMapper.mapToDomain);
      await service.loadCityList();
      expect(CityMapper.mapToDomain).toHaveBeenCalledTimes(cityTableParamsList.length);
    });

    it(`should be called mapToDomain method of CityMapper with params`, async () => {
      jest.spyOn(repositoryService, `findAll`).mockResolvedValueOnce(cityTableParamsList);
      CityMapper.mapToDomain = jest.fn(CityMapper.mapToDomain);
      await service.loadCityList();
      expect(CityMapper.mapToDomain).toHaveBeenNthCalledWith(1, cityTableParamsList[0]);
      expect(CityMapper.mapToDomain).toHaveBeenNthCalledWith(2, cityTableParamsList[1]);
    });

    it(`should return result of mapToDomain method of CityMapper`, async () => {
      const cityEntityList: CityEntity[] = cityTableParamsList.map((cityTableParams: ICityTableParams) => CityMapper.mapToDomain(cityTableParams));
      jest.spyOn(repositoryService, `findAll`).mockResolvedValueOnce(cityTableParamsList);
      const cityOrmEntityResult: ICityTableParams[] = await service.loadCityList();
      expect(cityOrmEntityResult).toEqual(cityEntityList);
    });
  });

  describe(`loadCityById method`, () => {
    it(`should call findOne method of repository`, async () => {
      const findOne = jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(cityTableParams);
      await service.loadCityById(cityTableParams.id);
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    it(`should call mapToDomain method of CityMapper`, async () => {
      jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(cityTableParams);
      CityMapper.mapToDomain = jest.fn(CityMapper.mapToDomain);
      await service.loadCityById(cityTableParams.id);
      expect(CityMapper.mapToDomain).toHaveBeenCalledTimes(1);
    });

    it(`should be called mapToDomain method of CityMapper with params`, async () => {
      jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(cityTableParams);
      CityMapper.mapToDomain = jest.fn(CityMapper.mapToDomain);
      await service.loadCityById(cityTableParams.id);
      expect(CityMapper.mapToDomain).toHaveBeenCalledWith(cityTableParams);
    });

    it(`should return result of mapToDomain method of CityMapper`, async () => {
      jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(cityTableParams);
      const cityEntity = CityMapper.mapToDomain(cityTableParams);
      jest.fn(CityMapper.mapToDomain).mockReturnValue(cityEntity);
      const cityOrmEntityResult: ICityTableParams = await service.loadCityById(cityTableParams.id);
      expect(cityOrmEntityResult).toEqual(cityEntity);
    });
  });
});
