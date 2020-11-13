import { CityEntity } from 'domains/entities';


export interface LoadCityByIdPort {
  loadCityById(id: number): Promise<CityEntity>;
}
