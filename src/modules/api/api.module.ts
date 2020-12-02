import { Module } from '@nestjs/common';

import { AuthModule, CityModule } from './controllers';


@Module({
  imports: [
    AuthModule,
    CityModule,
  ],
})
export class ApiModule {}
