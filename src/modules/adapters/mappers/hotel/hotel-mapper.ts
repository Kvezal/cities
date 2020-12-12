import {
  FeatureEntity,
  HotelEntity,
  ImageEntity,
  UserEntity,
} from 'domains/entities';

import {
  FeatureOrmEntity,
  ImageOrmEntity,
  HotelOrmEntity,
  UserOrmEntity,
} from '../../orm-entities';
import { CityMapper} from '../city';
import { FeatureMapper } from '../feature';
import { HotelTypeMapper } from '../hotel-type';
import { ImageMapper } from '../image';
import { LocationMapper } from '../location';
import { UserMapper } from '../user';


export class HotelMapper {
  static mapToDomain(ormEntity: HotelOrmEntity): HotelEntity {
    return HotelEntity.create({
      id: ormEntity.id,
      title: ormEntity.title,
      description: ormEntity.description,
      bedroomCount: ormEntity.bedroomCount,
      maxAdultCount: ormEntity.maxAdultCount,
      price: ormEntity.price,
      isPremium: ormEntity.isPremium,
      rating: ormEntity.rating,
      features: ormEntity.features.map((feature: FeatureOrmEntity) => FeatureMapper.mapToDomain(feature)),
      type: HotelTypeMapper.mapToDomain(ormEntity.type),
      city: CityMapper.mapToDomain(ormEntity.city),
      location: LocationMapper.mapToDomain(ormEntity.location),
      host: UserMapper.mapToDomain(ormEntity.host),
      images: ormEntity.images.map((image: ImageOrmEntity) => ImageMapper.mapToDomain(image)),
      favorites: ormEntity.favorites.map((favorite: UserOrmEntity) => UserMapper.mapToDomain(favorite)),
    });
  }

  static mapToOrmEntity(domain: HotelEntity): HotelOrmEntity {
    const ormEntity = new HotelOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.title = domain.title;
    ormEntity.description = domain.description;
    ormEntity.bedroomCount = domain.bedroomCount;
    ormEntity.maxAdultCount = domain.maxAdultCount;
    ormEntity.price = domain.price;
    ormEntity.isPremium = domain.isPremium;
    ormEntity.rating = domain.rating;
    ormEntity.features = domain.features.map((feature: FeatureEntity) => FeatureMapper.mapToOrmEntity(feature));
    ormEntity.type = HotelTypeMapper.mapToOrmEntity(domain.type);
    ormEntity.city = CityMapper.mapToOrmEntity(domain.city);
    ormEntity.location = LocationMapper.mapToOrmEntity(domain.location);
    ormEntity.host = UserMapper.mapToOrmEntity(domain.host);
    ormEntity.images = domain.images.map((image: ImageEntity) => ImageMapper.mapToOrmEntity(image));
    ormEntity.favorites = domain.favorites.map((favorite: UserEntity) => UserMapper.mapToOrmEntity(favorite));
    return ormEntity;
  }
}
