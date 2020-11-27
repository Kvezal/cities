import { Module } from '@nestjs/common';

import {
  CityService,
  cityServiceSymbol,
  FavoriteService,
  favoriteServiceSymbol,
  HotelService,
  hotelServiceSymbol,
  UserService,
  userServiceSymbol,
} from 'domains/services';

import { CommonAdapterModule } from './services';
import { CityAdapterService } from './services/city';
import { FavoriteAdapterService } from './services/favorite';
import { HotelAdapterService } from './services/hotel';
import { UserAdapterService } from './services/user';


@Module({
  imports: [
    CommonAdapterModule
  ],
  providers: [
    {
      provide: cityServiceSymbol,
      useFactory: (cityAdapterService: CityAdapterService) => new CityService(cityAdapterService, cityAdapterService),
      inject: [CityAdapterService],
    },
    {
      provide: favoriteServiceSymbol,
      useFactory: (favoriteAdapterService: FavoriteAdapterService) => new FavoriteService(
        favoriteAdapterService,
        favoriteAdapterService,
        favoriteAdapterService,
        favoriteAdapterService
      ),
      inject: [FavoriteAdapterService],
    },
    {
      provide: hotelServiceSymbol,
      useFactory: (hotelAdapterService: HotelAdapterService) => new HotelService(hotelAdapterService, hotelAdapterService),
      inject: [HotelAdapterService],
    },
    {
      provide: userServiceSymbol,
      useFactory: (userAdapterService: UserAdapterService) => new UserService(userAdapterService, userAdapterService),
      inject: [UserAdapterService],
    },
  ],
  exports: [
    cityServiceSymbol,
    hotelServiceSymbol,
    userServiceSymbol,
    favoriteServiceSymbol,
  ],
})
export class AdapterModule {

}
