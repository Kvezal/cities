import { Module } from '@nestjs/common';

import { AdapterModule } from 'modules/adapters';
import { ApiModule } from 'modules/api';


@Module({
  imports: [
    AdapterModule,
    ApiModule,
  ],
})
export class AppModule {}
