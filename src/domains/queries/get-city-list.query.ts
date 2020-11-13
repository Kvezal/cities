import { CityEntity } from '../entities';


export interface GetCityListQuery {
  getCityList(): Promise<CityEntity[]>;
}
