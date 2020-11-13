import { CityEntity } from '../entities';


export interface LoadCityListPort {
  loadCityList(): Promise<CityEntity[]>;
}
