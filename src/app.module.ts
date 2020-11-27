import { Module } from '@nestjs/common';

import { ConfigModule } from 'modules/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdapterModule } from 'modules/adapters/adapter.module';


@Module({
  imports: [
    ConfigModule,
    AdapterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
