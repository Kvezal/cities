import { CityEntity } from 'domains/entities';


export interface LoadCityByIdPort {
  loadCityById(id: string): Promise<CityEntity>;
}
