import { HotelTypeEntity } from 'domains/entities';

import { HotelTypeOrmEntity } from '../../orm-entities';


export class HotelTypeMapper {
  static mapToDomain(ormEntity: HotelTypeOrmEntity): HotelTypeEntity {
    return HotelTypeEntity.create({
      id: ormEntity.id,
      title: ormEntity.title,
    });
  }

  static mapToOrmEntity(domain: HotelTypeEntity): HotelTypeOrmEntity {
    const ormEntity = new HotelTypeOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.title = domain.title;
    return ormEntity;
  }
}
