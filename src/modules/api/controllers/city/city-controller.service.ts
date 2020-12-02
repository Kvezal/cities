import { Inject, Injectable } from '@nestjs/common';

import { CityEntity } from 'domains/entities';
import { CityService, cityServiceSymbol } from 'domains/services';
import { CityMapper, CityOrmEntity } from 'modules/adapters';


@Injectable()
export class CityControllerService {
  constructor(
    @Inject(cityServiceSymbol) private readonly _cityService: CityService
  ) {}

  public async getCityList(): Promise<CityOrmEntity[]> {
    const cityEntities: CityEntity[] = await this._cityService.getCityList();
    return cityEntities.map((cityEntity: CityEntity) => CityMapper.mapToOrmEntity(cityEntity));
  }
}
