import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from './config.service';


@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig(process.env))
  ],
})
export class ConfigModule {

}
