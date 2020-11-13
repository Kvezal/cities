import { CityEntity } from 'domains/entities';


export interface GetCityByIdQuery {
  getCityById(cityId: number): Promise<CityEntity>;
}
