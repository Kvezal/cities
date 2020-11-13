import { HotelTypeEntity, IHotelType } from '../hotel-type';
import { CityEntity, ICity } from '../city';
import { FeatureEntity, IFeature } from '../feature';
import { IImage, ImageEntity } from '../image';
import { ILocation, LocationEntity } from '../location';
import { IUser, UserEntity } from '../user';


export interface IHotel {
  id: number;
  title: string;
  description: string;
  bedroomCount: number;
  maxAdultCount: number;
  price: number;
  isPremium: boolean;
  rating: number;
  features: (IFeature | FeatureEntity)[];
  type: IHotelType | HotelTypeEntity;
  city: ICity | CityEntity;
  location: ILocation | LocationEntity;
  host: IUser | UserEntity;
  images: (IImage | ImageEntity)[];
}
