import {
  FeatureEntity,
  HotelEntity,
  ImageEntity,
} from 'domains/entities';
import {
  IFeatureTableParams,
  IHotelTableParams,
  IImageTableParams,
} from 'modules/db/interfaces';

import { CityMapper } from '../city';
import { FeatureMapper } from '../feature';
import { HotelTypeMapper } from '../hotel-type';
import { ImageMapper } from '../image';
import { LocationMapper } from '../location';
import { UserMapper } from '../user';


export class HotelMapper {
  static mapToDomain(tableParams: IHotelTableParams): HotelEntity {
    return HotelEntity.create({
      id: tableParams.id,
      title: tableParams.title,
      description: tableParams.description,
      bedroomCount: tableParams.bedroom_count,
      maxAdultCount: tableParams.max_adult_count,
      price: tableParams.price,
      isPremium: tableParams.is_premium,
      rating: tableParams.rating,
      features: tableParams.features.map((feature: IFeatureTableParams) => FeatureMapper.mapToDomain(feature)),
      type: HotelTypeMapper.mapToDomain(tableParams.type),
      city: CityMapper.mapToDomain(tableParams.city),
      location: LocationMapper.mapToDomain(tableParams.location),
      host: UserMapper.mapToDomain(tableParams.host),
      images: tableParams.images.map((image: IImageTableParams) => ImageMapper.mapToDomain(image)),
      isFavorite: tableParams.is_favorite,
    });
  }

  static mapToTableParams(domain: HotelEntity): IHotelTableParams {
    return {
      id: domain.id,
      title: domain.title,
      description: domain.description,
      bedroom_count: domain.bedroomCount,
      max_adult_count: domain.maxAdultCount,
      price: domain.price,
      is_premium: domain.isPremium,
      rating: domain.rating,
      features: domain.features.map((feature: FeatureEntity) => FeatureMapper.mapToTableParams(feature)),
      type: HotelTypeMapper.mapToTableParams(domain.type),
      city: CityMapper.mapToTableParams(domain.city),
      location: LocationMapper.mapToTableParams(domain.location),
      host: UserMapper.mapToTableParams(domain.host),
      images: domain.images.map((image: ImageEntity) => ImageMapper.mapToTableParams(image)),
      is_favorite: domain.isFavorite
    };
  }
}
