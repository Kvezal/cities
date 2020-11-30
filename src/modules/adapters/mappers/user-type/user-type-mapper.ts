import { UserTypeEntity } from 'domains/entities';

import { UserTypeOrmEntity } from '../../orm-entities';


export class UserTypeMapper {
  static mapToDomain(ormEntity: UserTypeOrmEntity): UserTypeEntity {
    return UserTypeEntity.create({
      id: ormEntity.id,
      title: ormEntity.title,
    });
  }

  static mapToOrmEntity(domain: UserTypeEntity): UserTypeOrmEntity {
    const ormEntity = new UserTypeOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.title = domain.title;
    return ormEntity;
  }
}
