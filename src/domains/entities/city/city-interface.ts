import { ILocation, LocationEntity } from 'domains/entities';


export interface ICity {
  id: string;
  title: string;
  location: ILocation | LocationEntity;
}
