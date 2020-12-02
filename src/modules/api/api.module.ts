import { Module } from '@nestjs/common';

import { AuthModule, CityModule, CommentModule, HotelModule } from './controllers';


@Module({
  imports: [
    AuthModule,
    CityModule,
    CommentModule,
    HotelModule,
  ],
})
export class ApiModule {}
