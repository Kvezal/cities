import { CityEntity } from '../entities/city';


export interface LoadCityByIdPort {
  loadCityById(id: number): CityEntity;
}
