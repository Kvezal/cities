import { CityEntity } from 'domains/entities';


export interface GetCityByIdQuery {
  getCityById(cityId: string): Promise<CityEntity>;
}
