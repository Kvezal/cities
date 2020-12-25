import {
  ILocation,
  LocationEntity,
} from 'domains/entities';
import { ILocationTableParams } from 'modules/db/interfaces';

import { LocationMapper } from './location-mapper';


const locationTableParams: ILocationTableParams = {
  id: `1008131ec-cb07-499a-86e4-6674afa31532`,
  latitude: 0.000012,
  longitude: 0.000013,
  zoom: 10,
};

const locationEntityParams: ILocation = {
  id: locationTableParams.id,
  latitude: locationTableParams.latitude,
  longitude: locationTableParams.longitude,
  zoom: locationTableParams.zoom,
};

describe(`Location Mapper`, () => {
  const entity: LocationEntity = LocationEntity.create(locationEntityParams);

  describe(`mapToDomain`, () => {
    it('should call create method of LocationEntity', function() {
      LocationEntity.create = jest.fn(LocationEntity.create);
      LocationMapper.mapToDomain(locationTableParams);
      expect(LocationEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of LocationEntity with params', function() {
      LocationEntity.create = jest.fn(LocationEntity.create);
      LocationMapper.mapToDomain(locationTableParams);
      expect(LocationEntity.create).toHaveBeenCalledWith(locationTableParams);
    });

    it('should return create method result of LocationEntity', function() {
      LocationEntity.create = jest.fn(LocationEntity.create).mockReturnValue(entity);
      const result: LocationEntity = LocationMapper.mapToDomain(locationTableParams);
      expect(result).toEqual(entity);
    });

    it.each([`id`, `latitude`, `longitude`, `zoom`])('should have %p property in result', function(property: string) {
      const result: LocationEntity = LocationMapper.mapToDomain(locationTableParams);
      expect(result).toHaveProperty(property);
    });
  });

  describe(`mapToTableParams`, () => {
    it('should return LocationOrmEntity', function() {
      const result: ILocationTableParams = LocationMapper.mapToTableParams(entity);
      expect(result).toEqual(locationTableParams);
    });

    it.each([`id`, `latitude`, `longitude`, `zoom`])('should have %p property in result', function(property: string) {
      const result: ILocationTableParams = LocationMapper.mapToTableParams(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
