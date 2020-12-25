import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { UserEntity } from 'domains/entities';
import {
  LoadUserByEmailPort,
  LoadUserByIdPort,
  SaveUserPort,
} from 'domains/ports';
import { UserMapper } from 'modules/adapters/mappers';
import { UsersDbTable } from 'modules/db';
import { IUserTableParams } from 'modules/db/interfaces';


@Injectable()
export class UserAdapterService implements LoadUserByIdPort, LoadUserByEmailPort, SaveUserPort {
  constructor(
    @Inject(UsersDbTable) private readonly _usersDbTable: UsersDbTable
  ) {}

  public async loadUserById(id: string): Promise<UserEntity> {
    const user: IUserTableParams = await this._usersDbTable.findOne({ id });
    return user && UserMapper.mapToDomain(user);
  }

  public async loadUserByEmail(email: string): Promise<UserEntity> {
    const user: IUserTableParams = await this._usersDbTable.findOne({email});
    return user && UserMapper.mapToDomain(user);
  }

  public async saveUser(userEntity: UserEntity): Promise<UserEntity> {
    const user = UserMapper.mapToTableParams(userEntity);
    const createdUserOrmEntity = await this._usersDbTable.createOne(user);
    return createdUserOrmEntity && UserMapper.mapToDomain(createdUserOrmEntity);
  }
}
