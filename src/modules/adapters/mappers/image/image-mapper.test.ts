import { ImageEntity } from 'domains/entities';

import { ImageOrmEntity } from '../../orm-entities';
import { ImageMapper } from './image.mapper';


const ormEntity: ImageOrmEntity = {
  id: `1`,
  title: `title`,
};

describe(`Image Mapper`, () => {
  const entity: ImageEntity = ImageEntity.create(ormEntity);

  describe(`mapToDomain`, () => {
    it('should call create method of ImageEntity', function() {
      ImageEntity.create = jest.fn(ImageEntity.create);
      ImageMapper.mapToDomain(ormEntity);
      expect(ImageEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of ImageEntity with params', function() {
      ImageEntity.create = jest.fn(ImageEntity.create);
      ImageMapper.mapToDomain(ormEntity);
      expect(ImageEntity.create).toHaveBeenCalledWith(ormEntity);
    });

    it('should return create method result of ImageEntity', function() {
      ImageEntity.create = jest.fn(ImageEntity.create).mockReturnValue(entity);
      const result = ImageMapper.mapToDomain(ormEntity);
      expect(result).toEqual(entity);
    });
  });

  describe(`mapToOrmEntity`, () => {
    it('should return FeatureOrmEntity', function() {
      const result = ImageMapper.mapToOrmEntity(entity);
      expect(result).toEqual(ormEntity);
    });

    it.each([`id`, `title`])('should have %p property in result', function(property) {
      const result = ImageMapper.mapToOrmEntity(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
