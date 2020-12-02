import { Module } from '@nestjs/common';

import { AdapterModule } from 'modules/adapters';

import { CityController } from './city.controller';
import { CityControllerService } from './city-controller.service';


@Module({
  imports: [
    AdapterModule,
  ],
  controllers: [
    CityController,
  ],
  providers: [
    CityControllerService,
  ]
})
export class CityModule {}
