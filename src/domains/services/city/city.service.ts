import { CityEntity } from '../../entities';
import { LoadCityByIdPort, LoadCityListPort } from '../../ports';
import { GetCityByIdQuery, GetCityListQuery } from '../../queries';


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

  public async getCityById(cityId: number): Promise<CityEntity> {
    return this._cityLoaderService.loadCityById(cityId);
  }
}
