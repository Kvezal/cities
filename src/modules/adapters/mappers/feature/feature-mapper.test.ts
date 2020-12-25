import { FeatureEntity } from 'domains/entities';
import { IFeatureTableParams } from 'modules/db/interfaces';

import { FeatureMapper } from './feature-mapper';


const featureTableParams: IFeatureTableParams = {
  id: `1008131ec-cb07-499a-86e4-6674afa31532`,
  title: `title`,
};

describe(`Feature Mapper`, () => {
  const entity: FeatureEntity = FeatureEntity.create(featureTableParams);

  describe(`mapToDomain`, () => {
    it('should call create method of FeatureEntity', function() {
      FeatureEntity.create = jest.fn(FeatureEntity.create);
      FeatureMapper.mapToDomain(featureTableParams);
      expect(FeatureEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of FeatureEntity with params', function() {
      FeatureEntity.create = jest.fn(FeatureEntity.create);
      FeatureMapper.mapToDomain(featureTableParams);
      expect(FeatureEntity.create).toHaveBeenCalledWith(featureTableParams);
    });

    it('should return create method result of FeatureEntity', function() {
      FeatureEntity.create = jest.fn(FeatureEntity.create).mockReturnValue(entity);
      const result = FeatureMapper.mapToDomain(featureTableParams);
      expect(result).toEqual(entity);
    });

    it.each([`id`, `title`])('should have %p property', function(property: string) {
      const result = FeatureMapper.mapToDomain(entity);
      expect(result).toHaveProperty(property);
    });
  });

  describe(`mapToTableParams`, () => {
    it('should return FeatureOrmEntity', function() {
      const result = FeatureMapper.mapToTableParams(entity);
      expect(result).toEqual(featureTableParams);
    });

    it.each([`id`, `title`])('should have %p property in result', function(property: string) {
      const result = FeatureMapper.mapToTableParams(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
