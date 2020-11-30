import { CityEntity } from 'domains/entities';


export interface GetCityListQuery {
  getCityList(): Promise<CityEntity[]>;
}
