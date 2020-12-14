import { Module } from '@nestjs/common';

import { ApiModule } from 'modules/api';
import { AdapterModule } from 'modules/adapters';

import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    AdapterModule,
    ApiModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
