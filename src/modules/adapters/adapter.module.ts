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
import { RatingAdapterService } from 'modules/adapters/services/rating/rating-adapter.service';


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
        hotelAdapterService: HotelAdapterService,
        ratingAdapterService: RatingAdapterService,
      ) => new CommentService(
        commentAdapterService,
        commentAdapterService,
        userAdapterService,
        hotelAdapterService,
        ratingAdapterService,
        ratingAdapterService,
        ratingAdapterService
      ),
      inject: [
        CommentAdapterService,
        UserAdapterService,
        HotelAdapterService,
        RatingAdapterService,
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
