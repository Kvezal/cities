import {
  IImage,
  ImageEntity,
} from 'domains/entities';

import { ImageMapper } from './image.mapper';
import { IImageTableParams } from 'modules/db/interfaces';


const imageTableParams: IImageTableParams = {
  id: `1008131ec-cb07-499a-86e4-6674afa31532`,
  title: `title`,
};

const imageEntityParams: IImage = {
  id: `1008131ec-cb07-499a-86e4-6674afa31532`,
  title: `title`,
};

describe(`Image Mapper`, () => {
  const imageEntity: ImageEntity = ImageEntity.create(imageEntityParams);

  describe(`mapToDomain`, () => {
    it('should call create method of ImageEntity', function() {
      ImageEntity.create = jest.fn(ImageEntity.create);
      ImageMapper.mapToDomain(imageTableParams);
      expect(ImageEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of ImageEntity with params', function() {
      ImageEntity.create = jest.fn(ImageEntity.create);
      ImageMapper.mapToDomain(imageTableParams);
      expect(ImageEntity.create).toHaveBeenCalledWith(imageTableParams);
    });

    it('should return create method result of ImageEntity', function() {
      ImageEntity.create = jest.fn(ImageEntity.create).mockReturnValue(imageEntity);
      const result = ImageMapper.mapToDomain(imageTableParams);
      expect(result).toEqual(imageEntity);
    });

    it.each([`id`, `title`])('should have %p property in result', function(property: string) {
      const result = ImageMapper.mapToDomain(imageTableParams);
      expect(result).toHaveProperty(property);
    });
  });

  describe(`mapToTableParams`, () => {
    it('should return FeatureOrmEntity', function() {
      const result = ImageMapper.mapToTableParams(imageEntity);
      expect(result).toEqual(imageTableParams);
    });

    it.each([`id`, `title`])('should have %p property in result', function(property: string) {
      const result = ImageMapper.mapToTableParams(imageEntity);
      expect(result).toHaveProperty(property);
    });
  });
});
