import { UserEntity } from 'domains/entities';
import { UserOrmEntity } from 'modules/orm-entities';

import { UserTypeMapper } from '../user-type';
import { ImageMapper } from '../image';


export class UserMapper {
  static mapToDomain(ormEntity: UserOrmEntity): UserEntity {
    return UserEntity.create({
      id: ormEntity.id,
      name: ormEntity.name,
      email: ormEntity.email,
      password: ormEntity.password,
      image: ImageMapper.mapToDomain(ormEntity.image),
      type: UserTypeMapper.mapToDomain(ormEntity.type),
    });
  }

  static mapToOrmEntity(domain: UserEntity): UserOrmEntity {
    const ormEntity = new UserOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.name = domain.name;
    ormEntity.email = domain.email;
    ormEntity.password = domain.password;
    ormEntity.image = ImageMapper.mapToOrmEntity(domain.image);
    ormEntity.type = UserTypeMapper.mapToOrmEntity(domain.type);
    return ormEntity;
  }
}
