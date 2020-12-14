import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';

import { AdapterModule } from 'modules/adapters';
import {
  DecodeJsonWebTokenMiddleware,
  InitLocalsMiddleware,
  RefreshJsonWebTokenMiddleware,
} from 'modules/api/middlewares';
import { ConfigModule } from 'modules/config';

import { HotelController } from './hotel.controller';
import { HotelControllerService } from './hotel-controller.service';


@Module({
  imports: [
    AdapterModule,
    ConfigModule,
  ],
  controllers: [
    HotelController,
  ],
  providers: [
    HotelControllerService,
  ],
})
export class HotelModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(
      InitLocalsMiddleware,
      DecodeJsonWebTokenMiddleware,
      RefreshJsonWebTokenMiddleware
    )
      .forRoutes(HotelController)
  }
}
