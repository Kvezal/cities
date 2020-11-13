import { CityEntity } from 'domains/entities';


export interface LoadCityListPort {
  loadCityList(): Promise<CityEntity[]>;
}
