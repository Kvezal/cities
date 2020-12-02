import { Module } from '@nestjs/common';

import { AdapterModule } from 'modules/adapters';

import { AuthController } from './auth.controller';
import { AuthControllerService } from './auth-controller.service';


@Module({
  imports: [
    AdapterModule,
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthControllerService,
  ],
})
export class AuthModule {}
