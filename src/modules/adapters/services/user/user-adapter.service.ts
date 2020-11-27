import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'domains/entities';
import { LoadUserByEmailPort, LoadUserByIdPort, SaveUserPort } from 'domains/ports';
import { UserOrmEntity } from 'modules/orm-entities';
import { UserMapper } from 'modules/mappers';


@Injectable()
export class UserAdapterService implements LoadUserByIdPort, LoadUserByEmailPort, SaveUserPort {
  constructor(
    @InjectRepository(UserOrmEntity) private readonly _userRepository: Repository<UserOrmEntity>
  ) {}

  public async loadUserById(id: string): Promise<UserEntity> {
    const userOrmEntity: UserOrmEntity = await this._userRepository.findOne(id);
    return UserMapper.mapToDomain(userOrmEntity);
  }

  public async loadUserByEmail(email: string): Promise<UserEntity> {
    const userOrmEntity: UserOrmEntity = await this._userRepository.findOne({email});
    return UserMapper.mapToDomain(userOrmEntity);
  }

  public async saveUser(userEntity: UserEntity): Promise<UserEntity> {
    const userOrmEntity = UserMapper.mapToOrmEntity(userEntity);
    const createdUserOrmEntity = await this._userRepository.create(userOrmEntity);
    return UserMapper.mapToDomain(createdUserOrmEntity);
  }
}
