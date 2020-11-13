import { ILocation, LocationEntity } from 'domains/entities';


export interface ICity {
  id: number;
  title: string;
  location: ILocation | LocationEntity;
}
