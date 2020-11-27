import { Module } from '@nestjs/common';

import {
  CityService,
  cityServiceSymbol,
  CommentService,
  commentServiceSymbol,
  FavoriteService,
  favoriteServiceSymbol,
  HotelService,
  hotelServiceSymbol,
  UserService,
  userServiceSymbol,
} from 'domains/services';

import {
  CommonAdapterModule,
  CityAdapterService,
  FavoriteAdapterService,
  HotelAdapterService,
  UserAdapterService,
  CommentAdapterService,
} from './services';


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
      provide: commentServiceSymbol,
      useFactory: (
        commentAdapterService: CommentAdapterService,
        userAdapterService: UserAdapterService,
        hotelAdapterService: HotelAdapterService
      ) => new CommentService(
        commentAdapterService,
        commentAdapterService,
        commentAdapterService,
        userAdapterService,
        hotelAdapterService
      ),
      inject: [
        CommentAdapterService,
        UserAdapterService,
        HotelAdapterService,
      ]
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
    commentServiceSymbol,
    hotelServiceSymbol,
    userServiceSymbol,
    favoriteServiceSymbol,
  ],
})
export class AdapterModule {

}
