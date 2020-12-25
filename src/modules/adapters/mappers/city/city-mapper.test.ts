import { CityEntity } from 'domains/entities';

import { CityMapper, LocationMapper } from '../../mappers';


const ormEntity = {
  id: `1008131ec-cb07-499a-86e4-6674afa31532`,
  title: `title`,
  location: {
    id: `1008131ec-cb07-499a-86e4-6674afa31532`,
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

  describe(`mapToTableParams`, () => {
    it('should return CityOrmEntity', function() {
      const result = CityMapper.mapToTableParams(entity);
      expect(result).toEqual(ormEntity);
    });

    it.each([`id`, `title`, `location`])('should have %p property in result', function(property) {
      const result = CityMapper.mapToTableParams(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
