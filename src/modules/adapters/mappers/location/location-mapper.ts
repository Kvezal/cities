import { LocationEntity } from 'domains/entities';

import { LocationOrmEntity } from '../../orm-entities';


export class LocationMapper {
  static mapToDomain(ormEntity: LocationOrmEntity): LocationEntity {
    return LocationEntity.create({
      id: ormEntity.id,
      longitude: ormEntity.longitude,
      latitude: ormEntity.latitude,
      zoom: ormEntity.zoom,
    });
  }

  static mapToOrmEntity(domain: LocationEntity): LocationOrmEntity {
    const ormEntity = new LocationOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.longitude = domain.longitude;
    ormEntity.latitude = domain.latitude;
    ormEntity.zoom = domain.zoom;
    return ormEntity;
  }
}
