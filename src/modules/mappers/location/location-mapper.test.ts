import { LocationEntity } from 'domains/entities';
import { LocationOrmEntity } from 'modules/orm-entities';

import { LocationMapper } from './location-mapper';


const ormEntity: LocationOrmEntity = {
  id: `1`,
  latitude: 0.000012,
  longitude: 0.000013,
  zoom: 10,
};

describe(`Location Mapper`, () => {
  const entity: LocationEntity = LocationEntity.create(ormEntity);

  describe(`mapToDomain`, () => {
    it('should call create method of LocationEntity', function() {
      LocationEntity.create = jest.fn(LocationEntity.create);
      LocationMapper.mapToDomain(ormEntity);
      expect(LocationEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of LocationEntity with params', function() {
      LocationEntity.create = jest.fn(LocationEntity.create);
      LocationMapper.mapToDomain(ormEntity);
      expect(LocationEntity.create).toHaveBeenCalledWith(ormEntity);
    });

    it('should return create method result of LocationEntity', function() {
      LocationEntity.create = jest.fn(LocationEntity.create).mockReturnValue(entity);
      const result = LocationMapper.mapToDomain(ormEntity);
      expect(result).toEqual(entity);
    });
  });

  describe(`mapToOrmEntity`, () => {
    it('should return LocationOrmEntity', function() {
      const result = LocationMapper.mapToOrmEntity(entity);
      expect(result).toEqual(ormEntity);
    });

    it.each([`id`, `latitude`, `longitude`, `zoom`])('should have %p property in result', function(property) {
      const result = LocationMapper.mapToOrmEntity(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
