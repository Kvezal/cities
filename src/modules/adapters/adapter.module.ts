import { Module } from '@nestjs/common';

import {
  AuthService,
  authServiceSymbol,
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
  AuthAdapterService,
  CommonAdapterModule,
  CommentAdapterService,
  CityAdapterService,
  FavoriteAdapterService,
  HotelAdapterService,
  UserAdapterService,
  RatingAdapterService,
} from './services';


@Module({
  imports: [
    CommonAdapterModule
  ],
  providers: [
    {
      provide: authServiceSymbol,
      useFactory: (
        userAdapterService: UserAdapterService,
        authAdapterService: AuthAdapterService,
      ) => new AuthService(
        userAdapterService,
        authAdapterService,
        authAdapterService,
        authAdapterService
      ),
      inject: [
        UserAdapterService,
        AuthAdapterService,
      ],
    },
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
    authServiceSymbol,
    cityServiceSymbol,
    commentServiceSymbol,
    hotelServiceSymbol,
    userServiceSymbol,
    favoriteServiceSymbol,
  ],
})
export class AdapterModule {

}
