import { UserEntity } from 'domains/entities';
import { IUserTableParams } from 'modules/db/interfaces';

import { UserTypeMapper } from '../user-type';
import { ImageMapper } from '../image';


export class UserMapper {
  static mapToDomain(ormEntity: IUserTableParams): UserEntity {
    return UserEntity.create({
      id: ormEntity.id,
      name: ormEntity.name,
      email: ormEntity.email,
      password: ormEntity.password,
      image: ormEntity.image && ImageMapper.mapToDomain(ormEntity.image),
      type: UserTypeMapper.mapToDomain(ormEntity.type),
    });
  }


  static mapToTableParams(domain: UserEntity): IUserTableParams {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      image: domain.image && ImageMapper.mapToTableParams(domain.image),
      type: UserTypeMapper.mapToTableParams(domain.type),
    };
  }
}
