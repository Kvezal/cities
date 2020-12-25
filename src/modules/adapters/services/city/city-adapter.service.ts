import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { CityEntity } from 'domains/entities';
import { LoadCityByIdPort, LoadCityListPort } from 'domains/ports';
import { CityMapper } from 'modules/adapters/mappers';
import { CitiesDbTable } from 'modules/db';
import { ICityTableParams } from 'modules/db/interfaces';


@Injectable()
export class CityAdapterService implements
  LoadCityListPort,
  LoadCityByIdPort {
  constructor(
    @Inject(CitiesDbTable) private readonly _citiesDbTable: CitiesDbTable,
  ) {}


  public async loadCityList(): Promise<CityEntity[]> {
    const cities: ICityTableParams[] = await this._citiesDbTable.findAll();
    return cities.map((city: ICityTableParams) => CityMapper.mapToDomain(city));
  }


  public async loadCityById(cityId: string): Promise<CityEntity> {
    const city: ICityTableParams = await this._citiesDbTable.findOne({
      id: cityId,
    });
    return CityMapper.mapToDomain(city);
  }
}
