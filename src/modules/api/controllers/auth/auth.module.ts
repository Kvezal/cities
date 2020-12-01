import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthControllerService } from './auth-controller.service';


@Module({
  controllers: [AuthController],
  providers: [
    AuthControllerService
  ]
})
export class AuthModule {}
