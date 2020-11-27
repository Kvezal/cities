import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CityEntity } from 'domains/entities';
import { LoadCityByIdPort, LoadCityListPort } from 'domains/ports';
import { CityMapper } from 'modules/mappers';
import { CityOrmEntity } from 'modules/orm-entities';


@Injectable()
export class CityAdapterService implements
  LoadCityListPort,
  LoadCityByIdPort {
  constructor(
    @InjectRepository(CityOrmEntity) private _cityRepository: Repository<CityOrmEntity>
  ) {}

  public async loadCityList(): Promise<CityEntity[]> {
    const cityOrmEntityList: CityOrmEntity[] = await this._cityRepository.find();
    return cityOrmEntityList.map((cityOrmEntity: CityOrmEntity) => CityMapper.mapToDomain(cityOrmEntity));
  }

  public async loadCityById(cityId: string): Promise<CityEntity> {
    const cityOrmEntity: CityOrmEntity = await this._cityRepository.findOne(cityId);
    return CityMapper.mapToDomain(cityOrmEntity);
  }
}
