import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AdapterModule } from 'modules/adapters';
import {
  AccessMiddleware,
  DecodeJsonWebTokenMiddleware,
  InitLocalsMiddleware,
  RefreshJsonWebTokenMiddleware,
} from 'modules/api/middlewares';
import { JsonWebTokenExceptionFilter } from 'modules/api/filters';
import { ConfigModule } from 'modules/config';

import { FavoriteController } from './favorite.controller';
import { FavoriteControllerService } from './favorite-controller.service';


@Module({
  imports: [
    AdapterModule,
    ConfigModule,
  ],
  controllers: [
    FavoriteController,
  ],
  providers: [
    FavoriteControllerService,
    {
      provide: APP_FILTER,
      useClass: JsonWebTokenExceptionFilter,
    }
  ],
})
export class FavoriteModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(
      InitLocalsMiddleware,
      DecodeJsonWebTokenMiddleware,
      RefreshJsonWebTokenMiddleware,
      AccessMiddleware
    )
      .forRoutes(FavoriteController)
  }
}
