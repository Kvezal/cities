import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoriteService, favoriteServiceSymbol } from 'domains/services';
import { FavoriteOrmEntity, HotelOrmEntity, UserOrmEntity } from 'modules/orm-entities';

import { FavoriteAdapterService } from './favorite-adapter.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteOrmEntity,
      HotelOrmEntity,
      UserOrmEntity,
    ]),
  ],
  providers: [
    FavoriteAdapterService,
    {
      provide: favoriteServiceSymbol,
      useFactory: (favoriteAdapterService: FavoriteAdapterService) => new FavoriteService(
        favoriteAdapterService,
        favoriteAdapterService,
        favoriteAdapterService
      ),
      inject: [FavoriteAdapterService],
    },
  ],
  exports: [favoriteServiceSymbol],
})
export class FavoriteAdapterModule {}
