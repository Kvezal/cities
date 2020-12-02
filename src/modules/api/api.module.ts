import { Module } from '@nestjs/common';

import { AuthModule, CityModule, HotelModule } from './controllers';


@Module({
  imports: [
    AuthModule,
    CityModule,
    HotelModule,
  ],
})
export class ApiModule {}
