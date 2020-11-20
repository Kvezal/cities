import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CityEntity } from 'domains/entities';
import { CityAdapterService } from 'modules/adapters';
import { CityOrmEntity } from 'modules/orm-entities';
import { CityMapper } from 'modules/mappers';


const cityOrmEntity = {
  id: `1`,
  title: `title`,
  location: {
    id: `1`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
};

describe(`City Adapter Service`, () => {
  let service: CityAdapterService;
  let repositoryService: Repository<CityOrmEntity>;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        CityAdapterService,
        {
          provide: getRepositoryToken(CityOrmEntity),
          useClass: Repository
        },
      ],
    }).compile();
    service = testModule.get<CityAdapterService>(CityAdapterService);
    repositoryService = testModule.get<Repository<CityOrmEntity>>(getRepositoryToken(CityOrmEntity));
  });

  it(`should define service`, () => {
    expect(service).toBeDefined();
  });

  describe(`loadCityList method`, () => {
    const cityOrmEntityList = [
      cityOrmEntity,
      {
        ...cityOrmEntity,
        id: `2`,
      }
    ];

    it(`should call find method of repository`, async () => {
      const find = jest.spyOn(repositoryService, `find`).mockResolvedValueOnce(cityOrmEntityList);
      await service.loadCityList();
      expect(find).toHaveBeenCalledTimes(1);
    });

    it(`should call mapToDomain method of CityMapper`, async () => {
      jest.spyOn(repositoryService, `find`).mockResolvedValueOnce(cityOrmEntityList);
      CityMapper.mapToDomain = jest.fn(CityMapper.mapToDomain);
      await service.loadCityList();
      expect(CityMapper.mapToDomain).toHaveBeenCalledTimes(cityOrmEntityList.length);
    });

    it(`should be called mapToDomain method of CityMapper with params`, async () => {
      jest.spyOn(repositoryService, `find`).mockResolvedValueOnce(cityOrmEntityList);
      CityMapper.mapToDomain = jest.fn(CityMapper.mapToDomain);
      await service.loadCityList();
      expect(CityMapper.mapToDomain).toHaveBeenNthCalledWith(1, cityOrmEntityList[0]);
      expect(CityMapper.mapToDomain).toHaveBeenNthCalledWith(2, cityOrmEntityList[1]);
    });

    it(`should return result of mapToDomain method of CityMapper`, async () => {
      const cityEntityList = cityOrmEntityList.map((cityOrmEntity) => CityEntity.create(cityOrmEntity));
      jest.spyOn(repositoryService, `find`).mockResolvedValueOnce(cityOrmEntityList);
      const cityOrmEntityResult = await service.loadCityList();
      expect(cityOrmEntityResult).toEqual(cityEntityList);
    });
  });

  describe(`loadCityById method`, () => {
    it(`should call findOne method of repository`, async () => {
      const findOne = jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(cityOrmEntity);
      await service.loadCityById(cityOrmEntity.id);
      expect(findOne).toHaveBeenCalledTimes(1);
    });

    it(`should call mapToDomain method of CityMapper`, async () => {
      jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(cityOrmEntity);
      CityMapper.mapToDomain = jest.fn(CityMapper.mapToDomain);
      await service.loadCityById(cityOrmEntity.id);
      expect(CityMapper.mapToDomain).toHaveBeenCalledTimes(1);
    });

    it(`should be called mapToDomain method of CityMapper with params`, async () => {
      jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(cityOrmEntity);
      CityMapper.mapToDomain = jest.fn(CityMapper.mapToDomain);
      await service.loadCityById(cityOrmEntity.id);
      expect(CityMapper.mapToDomain).toHaveBeenCalledWith(cityOrmEntity);
    });

    it(`should return result of mapToDomain method of CityMapper`, async () => {
      jest.spyOn(repositoryService, `findOne`).mockResolvedValueOnce(cityOrmEntity);
      const cityEntity = CityEntity.create(cityOrmEntity);
      jest.fn(CityMapper.mapToDomain).mockReturnValue(cityEntity);
      const cityOrmEntityResult = await service.loadCityById(cityOrmEntity.id);
      expect(cityOrmEntityResult).toEqual(cityEntity);
    });
  });
});
