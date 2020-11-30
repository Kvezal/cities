import { CityEntity } from 'domains/entities';

import { CityOrmEntity } from '../../orm-entities';
import { LocationMapper } from '../location';


export class CityMapper {
  static mapToDomain(ormEntity: CityOrmEntity): CityEntity {
    return CityEntity.create({
      id: ormEntity.id,
      title: ormEntity.title,
      location: LocationMapper.mapToDomain(ormEntity.location)
    });
  }

  static mapToOrmEntity(domain: CityEntity): CityOrmEntity {
    const ormEntity = new CityOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.title = domain.title;
    ormEntity.location = LocationMapper.mapToOrmEntity(domain.location);
    return ormEntity;
  }
}
