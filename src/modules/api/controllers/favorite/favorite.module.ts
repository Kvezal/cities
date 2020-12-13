import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AdapterModule } from 'modules/adapters';
import {
  AccessMiddleware,
  DecodeJsonWebTokenMiddleware,
  InitLocalsMiddleware,
} from 'modules/api/middlewares';
import { JsonWebTokenExceptionFilter } from 'modules/api/filters';

import { FavoriteController } from './favorite.controller';
import { FavoriteControllerService } from './favorite-controller.service';



@Module({
  imports: [
    AdapterModule,
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
      cookieParser(),
      InitLocalsMiddleware,
      DecodeJsonWebTokenMiddleware,
      AccessMiddleware
    )
      .forRoutes(FavoriteController)
  }
}
