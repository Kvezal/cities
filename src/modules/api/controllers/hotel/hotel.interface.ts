import { IUserOut } from 'modules/api/controllers';
import {
  CityOrmEntity,
  LocationOrmEntity,
} from 'modules/adapters';


export interface IHotelOut {
  id: string,
  title: string,
  description: string,
  bedroomCount: number,
  maxAdultCount: number,
  price: number,
  isPremium: boolean,
  rating: number,
  features: string[],
  type: string,
  city: CityOrmEntity,
  location: LocationOrmEntity,
  host: IUserOut,
  images: string[],
  isFavorite: boolean,
}