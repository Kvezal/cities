import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService, userServiceSymbol } from 'domains/services';
import { UserOrmEntity, UserTypeOrmEntity } from 'modules/orm-entities';

import { UserAdapterService } from './user-adapter.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserOrmEntity,
      UserTypeOrmEntity,
    ])
  ],
  providers: [
    UserAdapterService,
    {
      provide: userServiceSymbol,
      useFactory: (userAdapterService: UserAdapterService) => new UserService(userAdapterService, userAdapterService),
      inject: [UserAdapterService],
    },
  ],
})
export class UserAdapterModule {}
