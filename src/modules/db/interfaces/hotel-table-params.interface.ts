import { ICityTableParams } from './city-table-params.interface';
import { IFeatureTableParams } from './feature-table-params.interface';
import { IHotelTypeTableParams } from './hotel-type-table-params.interface';
import { ILocationTableParams } from './location-table-params.interface';
import { IUserTableParams } from './user-table-params.interface';
import { IImageTableParams } from './image-table-params.interface';


export interface IHotelTableParams {
  id: string;
  title: string;
  description: string;
  bedroom_count: number;
  max_adult_count: number;
  price: number;
  is_premium: boolean;
  type: IHotelTypeTableParams;
  city: ICityTableParams;
  location: ILocationTableParams;
  host: IUserTableParams;
  images: IImageTableParams[];
  features: IFeatureTableParams[];
  is_favorite?: boolean;
  rating?: number;
}