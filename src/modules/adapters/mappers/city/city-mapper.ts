import { CityEntity } from 'domains/entities';

import { ICityTableParams } from 'modules/db/interfaces';

import { LocationMapper } from '../location';


export class CityMapper {
  static mapToDomain(tableParams: ICityTableParams): CityEntity {
    return CityEntity.create({
      id: tableParams.id,
      title: tableParams.title,
      location: LocationMapper.mapToDomain(tableParams.location)
    });
  }


  static mapToTableParams(domain: CityEntity): ICityTableParams {
    return {
      id: domain.id,
      title: domain.title,
      location: LocationMapper.mapToTableParams(domain.location),
    };
  }
}
