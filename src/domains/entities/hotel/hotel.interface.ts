import { IHotelType } from '../hotel-type';
import { ICity } from '../city';
import { IFeature } from '../feature';
import { IImage } from '../image';
import { ILocation } from '../location';
import { IUser } from '../user';


export interface IHotel {
  id: number;
  title: string;
  description: string;
  bedroomCount: number;
  maxAdultCount: number;
  price: number;
  isPremium: boolean;
  rating: number;
  features: IFeature[];
  type: IHotelType;
  city: ICity;
  location: ILocation;
  host: IUser;
  images: IImage[];
}
