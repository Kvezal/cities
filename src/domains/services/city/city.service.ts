import { CityEntity } from 'domains/entities';
import { LoadCityByIdPort, LoadCityListPort } from 'domains/ports';
import { GetCityByIdQuery, GetCityListQuery } from 'domains/queries';


export class CityService implements
  GetCityListQuery,
  GetCityByIdQuery {
  constructor(
    private readonly _cityListLoaderService: LoadCityListPort,
    private readonly _cityLoaderService: LoadCityByIdPort
  ) {}

  public async getCityList(): Promise<CityEntity[]> {
    return this._cityListLoaderService.loadCityList();
  }

  public async getCityById(cityId: string): Promise<CityEntity> {
    return this._cityLoaderService.loadCityById(cityId);
  }
}
