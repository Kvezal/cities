import { LocationEntity } from 'domains/entities';
import { ILocationTableParams } from 'modules/db/interfaces';


export class LocationMapper {
  static mapToDomain(ormEntity: ILocationTableParams): LocationEntity {
    return LocationEntity.create({
      id: ormEntity.id,
      longitude: ormEntity.longitude,
      latitude: ormEntity.latitude,
      zoom: ormEntity.zoom,
    });
  }


  static mapToTableParams(domain: LocationEntity): ILocationTableParams {
    return {
      id: domain.id,
      longitude: domain.longitude,
      latitude: domain.latitude,
      zoom: domain.zoom,
    };
  }
}
