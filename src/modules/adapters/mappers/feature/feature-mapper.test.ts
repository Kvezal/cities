import { FeatureEntity } from 'domains/entities';

import { FeatureOrmEntity } from '../../orm-entities';
import { FeatureMapper } from './feature-mapper';


const ormEntity: FeatureOrmEntity = {
  id: `1`,
  title: `title`,
};

describe(`Feature Mapper`, () => {
  const entity: FeatureEntity = FeatureEntity.create(ormEntity);

  describe(`mapToDomain`, () => {
    it('should call create method of FeatureEntity', function() {
      FeatureEntity.create = jest.fn(FeatureEntity.create);
      FeatureMapper.mapToDomain(ormEntity);
      expect(FeatureEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of FeatureEntity with params', function() {
      FeatureEntity.create = jest.fn(FeatureEntity.create);
      FeatureMapper.mapToDomain(ormEntity);
      expect(FeatureEntity.create).toHaveBeenCalledWith(ormEntity);
    });

    it('should return create method result of FeatureEntity', function() {
      FeatureEntity.create = jest.fn(FeatureEntity.create).mockReturnValue(entity);
      const result = FeatureMapper.mapToDomain(ormEntity);
      expect(result).toEqual(entity);
    });
  });

  describe(`mapToOrmEntity`, () => {
    it('should return FeatureOrmEntity', function() {
      const result = FeatureMapper.mapToOrmEntity(entity);
      expect(result).toEqual(ormEntity);
    });

    it.each([`id`, `title`])('should have %p property in result', function(property) {
      const result = FeatureMapper.mapToOrmEntity(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
