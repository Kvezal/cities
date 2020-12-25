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
  UserTypeAdapterService,
} from './services';


@Module({
  imports: [
    CommonAdapterModule,
  ],
  providers: [
    {
      provide: authServiceSymbol,
      useFactory: (
        userAdapterService: UserAdapterService,
        userTypeAdapterService: UserTypeAdapterService,
        authAdapterService: AuthAdapterService,
      ) => new AuthService(
        userAdapterService,
        userAdapterService,
        userTypeAdapterService,
        authAdapterService,
        authAdapterService,
        authAdapterService,
      ),
      inject: [
        UserAdapterService,
        UserTypeAdapterService,
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
      ) => new CommentService(
        commentAdapterService,
        commentAdapterService,
        userAdapterService,
        hotelAdapterService,
      ),
      inject: [
        CommentAdapterService,
        UserAdapterService,
        HotelAdapterService,
      ],
    },
    {
      provide: favoriteServiceSymbol,
      useFactory: (
        hotelAdapterService: HotelAdapterService,
        userAdapterService: UserAdapterService,
        favoriteAdapterService: FavoriteAdapterService,
      ) => new FavoriteService(
        hotelAdapterService,
        userAdapterService,
        favoriteAdapterService,
        favoriteAdapterService,
        favoriteAdapterService,
      ),
      inject: [
        HotelAdapterService,
        UserAdapterService,
        FavoriteAdapterService,
      ],
    },
    {
      provide: hotelServiceSymbol,
      useFactory: (
        hotelAdapterService: HotelAdapterService,
        userAdapterService: UserAdapterService,
      ) => new HotelService(
        hotelAdapterService,
        hotelAdapterService,
        userAdapterService,
      ),
      inject: [
        HotelAdapterService,
        UserAdapterService,
      ],
    },
    {
      provide: userServiceSymbol,
      useFactory: (userAdapterService: UserAdapterService) => new UserService(userAdapterService),
      inject: [UserAdapterService],
    },
  ],
  exports: [
    authServiceSymbol,
    cityServiceSymbol,
    commentServiceSymbol,
    favoriteServiceSymbol,
    hotelServiceSymbol,
    userServiceSymbol,
  ],
})
export class AdapterModule {

}
