import { Module } from '@nestjs/common';

import {
  CitiesDbTable,
  CommentsDbTable,
  DbModule,
  FavoritesDbTable,
  FeaturesDbTable,
  HotelsDbTable,
  HotelsFeaturesDbTable,
  HotelsImagesDbTable,
  HotelTypesDbTable,
  ImagesDbTable,
  LocationsDbTable,
  RatingsDbTable,
  RefreshTokensDbTable,
  UsersDbTable,
  UserTypesDbTable,
} from 'modules/db';

import { AuthAdapterService } from './auth';
import { CityAdapterService } from './city';
import { CommentAdapterService } from './comment';
import { FavoriteAdapterService } from './favorite';
import { HotelAdapterService } from './hotel';
import { UserAdapterService } from './user';
import { UserTypeAdapterService } from './user-type';



@Module({
  imports: [
    DbModule.forRoot({
      entities: [
        CitiesDbTable,
        CommentsDbTable,
        FavoritesDbTable,
        FeaturesDbTable,
        HotelsImagesDbTable,
        HotelTypesDbTable,
        HotelsDbTable,
        HotelsFeaturesDbTable,
        ImagesDbTable,
        LocationsDbTable,
        RatingsDbTable,
        RefreshTokensDbTable,
        UserTypesDbTable,
        UsersDbTable,
      ],
    }),
  ],
  providers: [
    AuthAdapterService,
    CityAdapterService,
    CommentAdapterService,
    FavoriteAdapterService,
    HotelAdapterService,
    UserAdapterService,
    UserTypeAdapterService
  ],
  exports: [
    AuthAdapterService,
    CityAdapterService,
    CommentAdapterService,
    FavoriteAdapterService,
    HotelAdapterService,
    UserAdapterService,
    UserTypeAdapterService
  ],
})
export class CommonAdapterModule {}
