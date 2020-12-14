import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AdapterModule } from 'modules/adapters';
import { JsonWebTokenExceptionFilter } from 'modules/api/filters';
import {
  AccessMiddleware,
  DecodeJsonWebTokenMiddleware,
  InitLocalsMiddleware,
  RefreshJsonWebTokenMiddleware,
} from 'modules/api/middlewares';
import { ConfigModule } from 'modules/config';

import { EApiRouteName } from '../api-route-names.enum';
import { CommentController } from './comment.controller';
import { CommentControllerService } from './comment-controller.service';


@Module({
  imports: [
    AdapterModule,
    ConfigModule,
  ],
  controllers: [
    CommentController,
  ],
  providers: [
    CommentControllerService,
    {
      provide: APP_FILTER,
      useClass: JsonWebTokenExceptionFilter,
    },
  ],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(
      InitLocalsMiddleware,
      DecodeJsonWebTokenMiddleware,
      RefreshJsonWebTokenMiddleware
    )
      .forRoutes(CommentController);

    consumer.apply(AccessMiddleware)
      .forRoutes({path: EApiRouteName.COMMENT, method: RequestMethod.POST})
  }
}
