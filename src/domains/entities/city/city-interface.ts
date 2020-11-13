import { ILocation, LocationEntity } from '../location';


export interface ICity {
  id: number;
  title: string;
  location: ILocation | LocationEntity;
}
