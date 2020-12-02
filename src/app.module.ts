import { Module } from '@nestjs/common';

import { ConfigModule } from 'modules/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdapterModule } from 'modules/adapters/adapter.module';
import { ApiModule } from 'modules/api';


@Module({
  imports: [
    ConfigModule,
    AdapterModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
