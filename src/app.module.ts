import { Module } from '@nestjs/common';

import { CityAdapterModule, FavoriteAdapterModule, HotelAdapterModule, UserAdapterModule } from 'modules/adapters';
import { ConfigModule } from 'modules/config';
import { OrmEntitiesModule } from 'modules/orm-entities';

import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule,
    OrmEntitiesModule,
    CityAdapterModule,
    UserAdapterModule,
    HotelAdapterModule,
    FavoriteAdapterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
