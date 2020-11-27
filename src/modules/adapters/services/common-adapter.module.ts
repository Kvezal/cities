import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CityOrmEntity,
  CommentOrmEntity,
  FavoriteOrmEntity,
  FeatureOrmEntity,
  HotelOrmEntity,
  HotelTypeOrmEntity,
  ImageOrmEntity,
  // JsonWebTokenOrmEntity,
  LocationOrmEntity,
  RatingOrmEntity,
  UserOrmEntity,
  UserTypeOrmEntity,
} from 'modules/orm-entities';

import { CityAdapterService } from './city';
import { HotelAdapterService } from './hotel';
import { UserAdapterService } from './user';
import { FavoriteAdapterService } from './favorite';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CityOrmEntity,
      CommentOrmEntity,
      FavoriteOrmEntity,
      FeatureOrmEntity,
      HotelOrmEntity,
      HotelTypeOrmEntity,
      ImageOrmEntity,
      // JsonWebTokenOrmEntity,
      LocationOrmEntity,
      RatingOrmEntity,
      UserOrmEntity,
      UserTypeOrmEntity,
    ])
  ],
  providers: [
    CityAdapterService,
    FavoriteAdapterService,
    HotelAdapterService,
    UserAdapterService,
  ],
  exports: [
    CityAdapterService,
    FavoriteAdapterService,
    HotelAdapterService,
    UserAdapterService,
  ],
})
export class CommonAdapterModule {}
