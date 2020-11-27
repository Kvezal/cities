import { Module } from '@nestjs/common';

import { OrmEntitiesModule } from '../orm-entities';
import { ViewOrmEntitiesModule } from '../view-orm-entities';
import { CityAdapterService } from './city';
import { CommentAdapterService } from './comment';
import { HotelAdapterService } from './hotel';
import { UserAdapterService } from './user';
import { FavoriteAdapterService } from './favorite';


@Module({
  imports: [
    OrmEntitiesModule,
    ViewOrmEntitiesModule,
  ],
  providers: [
    CityAdapterService,
    FavoriteAdapterService,
    HotelAdapterService,
    UserAdapterService,
    CommentAdapterService,
  ],
  exports: [
    CityAdapterService,
    FavoriteAdapterService,
    HotelAdapterService,
    UserAdapterService,
    CommentAdapterService,
  ],
})
export class CommonAdapterModule {}
