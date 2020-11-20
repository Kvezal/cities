import { HotelTypeEntity } from 'domains/entities';
import { HotelTypeOrmEntity } from 'modules/orm-entities';

import { HotelTypeMapper } from './hotel-type-mapper';


const ormEntity: HotelTypeOrmEntity = {
  id: `1`,
  title: `title`,
};

describe(`Hotel type Mapper`, () => {
  const entity: HotelTypeEntity = HotelTypeEntity.create(ormEntity);

  describe(`mapToDomain`, () => {
    it('should call create method of HotelTypeEntity', function() {
      HotelTypeEntity.create = jest.fn(HotelTypeEntity.create);
      HotelTypeMapper.mapToDomain(ormEntity);
      expect(HotelTypeEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of HotelTypeEntity with params', function() {
      HotelTypeEntity.create = jest.fn(HotelTypeEntity.create);
      HotelTypeMapper.mapToDomain(ormEntity);
      expect(HotelTypeEntity.create).toHaveBeenCalledWith(ormEntity);
    });

    it('should return create method result of HotelTypeEntity', function() {
      HotelTypeEntity.create = jest.fn(HotelTypeEntity.create).mockReturnValue(entity);
      const result = HotelTypeMapper.mapToDomain(ormEntity);
      expect(result).toEqual(entity);
    });
  });

  describe(`mapToOrmEntity`, () => {
    it('should return FeatureOrmEntity', function() {
      const result = HotelTypeMapper.mapToOrmEntity(entity);
      expect(result).toEqual(ormEntity);
    });

    it.each([`id`, `title`])('should have %p property in result', function(property) {
      const result = HotelTypeMapper.mapToOrmEntity(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
