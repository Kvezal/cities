import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'domains/entities';
import { LoadUserByEmailPort, LoadUserByIdPort, SaveUserPort } from 'domains/ports';
import { UserMapper } from 'modules/adapters/mappers';
import { UserOrmEntity } from 'modules/adapters/orm-entities';


@Injectable()
export class UserAdapterService implements LoadUserByIdPort, LoadUserByEmailPort, SaveUserPort {
  constructor(
    @InjectRepository(UserOrmEntity) private readonly _userRepository: Repository<UserOrmEntity>
  ) {}

  public async loadUserById(id: string): Promise<UserEntity> {
    const userOrmEntity: UserOrmEntity = await this._userRepository.findOne(id);
    return userOrmEntity && UserMapper.mapToDomain(userOrmEntity);
  }

  public async loadUserByEmail(email: string): Promise<UserEntity> {
    const userOrmEntity: UserOrmEntity = await this._userRepository.findOne({email});
    return userOrmEntity && UserMapper.mapToDomain(userOrmEntity);
  }

  public async saveUser(userEntity: UserEntity): Promise<UserEntity> {
    const userOrmEntity = UserMapper.mapToOrmEntity(userEntity);
    const createdUserOrmEntity = await this._userRepository.create(userOrmEntity);
    return createdUserOrmEntity && UserMapper.mapToDomain(createdUserOrmEntity);
  }
}
