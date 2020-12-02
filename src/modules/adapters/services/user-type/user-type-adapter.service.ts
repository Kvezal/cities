import { Injectable } from '@nestjs/common';

import { UserTypeEntity } from 'domains/entities';
import { LoadUserTypeByTitlePort } from 'domains/ports';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeMapper, UserTypeOrmEntity } from 'modules/adapters';


@Injectable()
export class UserTypeAdapterService implements LoadUserTypeByTitlePort {
  constructor(
    @InjectRepository(UserTypeOrmEntity) readonly _userTypeRepository: Repository<UserTypeOrmEntity>
  ) {}

  public async loadUserTypeByTitle(title: string): Promise<UserTypeEntity> {
    const userTypeOrmEntity = await this._userTypeRepository.findOne({
      where: {title},
    });
    return UserTypeMapper.mapToDomain(userTypeOrmEntity);
  }
}
