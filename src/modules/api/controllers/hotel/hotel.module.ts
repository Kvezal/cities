import { Module } from '@nestjs/common';

import { AdapterModule } from 'modules/adapters';

import { HotelController } from './hotel.controller';
import { HotelControllerService } from './hotel-controller.service';


@Module({
  imports: [
    AdapterModule,
  ],
  controllers: [
    HotelController,
  ],
  providers: [
    HotelControllerService,
  ],
})
export class HotelModule {}
