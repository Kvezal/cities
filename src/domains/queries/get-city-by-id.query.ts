import { CityEntity } from '../entities';


export interface GetCityByIdQuery {
  getCityById(cityId: number): Promise<CityEntity>;
}
