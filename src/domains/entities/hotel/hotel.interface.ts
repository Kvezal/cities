import {
  CityEntity,
  FeatureEntity,
  HotelTypeEntity,
  ICity,
  IFeature,
  IHotelType,
  IImage,
  ILocation,
  ImageEntity,
  IUser,
  LocationEntity,
  UserEntity,
} from 'domains/entities';


export interface IHotel {
  id: string;
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
  favorites: (IUser | UserEntity)[];
}
