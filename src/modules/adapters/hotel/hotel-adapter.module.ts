import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CityOrmEntity,
  FeatureOrmEntity,
  HotelOrmEntity,
  HotelTypeOrmEntity,
  ImageOrmEntity,
  LocationOrmEntity,
  RatingOrmEntity,
  UserOrmEntity,
} from 'modules/orm-entities';
import { hotelServiceSymbol, HotelService } from 'domains/services';

import { HotelAdapterService } from './hotel-adapter.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CityOrmEntity,
      FeatureOrmEntity,
      HotelOrmEntity,
      HotelTypeOrmEntity,
      ImageOrmEntity,
      LocationOrmEntity,
      RatingOrmEntity,
      UserOrmEntity,
    ])
  ],
  providers: [
    HotelAdapterService,
    {
      provide: hotelServiceSymbol,
      useFactory: (hotelAdapterService: HotelAdapterService) => new HotelService(hotelAdapterService, hotelAdapterService),
      inject: [HotelAdapterService],
    },
  ],
  exports: [hotelServiceSymbol],
})
export class HotelAdapterModule {}
