import { Module } from '@nestjs/common';

import { OrmEntitiesModule } from '../orm-entities';
import { ViewOrmEntitiesModule } from '../view-orm-entities';
import { AuthAdapterService } from './auth';
import { CityAdapterService } from './city';
import { CommentAdapterService } from './comment';
import { HotelAdapterService } from './hotel';
import { UserAdapterService } from './user';
import { FavoriteAdapterService } from './favorite';
import { RatingAdapterService } from './rating';
import { UserTypeAdapterService } from './user-type';


@Module({
  imports: [
    OrmEntitiesModule,
    ViewOrmEntitiesModule,
  ],
  providers: [
    AuthAdapterService,
    CityAdapterService,
    CommentAdapterService,
    FavoriteAdapterService,
    HotelAdapterService,
    RatingAdapterService,
    UserAdapterService,
    UserTypeAdapterService
  ],
  exports: [
    AuthAdapterService,
    CityAdapterService,
    CommentAdapterService,
    FavoriteAdapterService,
    HotelAdapterService,
    RatingAdapterService,
    UserAdapterService,
    UserTypeAdapterService
  ],
})
export class CommonAdapterModule {}
