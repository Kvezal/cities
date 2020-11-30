import { CityEntity } from 'domains/entities';

import { CityMapper, LocationMapper } from '../../mappers';


const ormEntity = {
  id: `1`,
  title: `title`,
  location: {
    id: `1`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
};

describe(`City Mapper`, () => {
  const entity: CityEntity = CityEntity.create(ormEntity);

  describe(`mapToDomain`, () => {
    it('should call create method of CityEntity', function() {
      CityEntity.create = jest.fn(CityEntity.create);
      CityMapper.mapToDomain(ormEntity);
      expect(CityEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of CityEntity with params', function() {
      CityEntity.create = jest.fn(CityEntity.create);
      CityMapper.mapToDomain(ormEntity);
      expect(CityEntity.create).toHaveBeenCalledWith({
        ...ormEntity,
        location: LocationMapper.mapToDomain(ormEntity.location),
      });
    });

    it('should return create method result of CityEntity', function() {
      CityEntity.create = jest.fn(CityEntity.create).mockReturnValue(entity);
      const result = CityMapper.mapToDomain(ormEntity);
      expect(result).toEqual(entity);
    });
  });

  describe(`mapToOrmEntity`, () => {
    it('should return CityOrmEntity', function() {
      const result = CityMapper.mapToOrmEntity(entity);
      expect(result).toEqual(ormEntity);
    });

    it.each([`id`, `title`, `location`])('should have %p property in result', function(property) {
      const result = CityMapper.mapToOrmEntity(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
