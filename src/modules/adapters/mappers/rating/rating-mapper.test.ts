import { IRating, RatingEntity } from 'domains/entities';

import { RatingOrmEntity } from '../../orm-entities';
import { RatingMapper } from './rating-mapper';


const entityParams: IRating = {
  value: 4,
  userId: `1`,
  hotelId: `1`,
};

describe(`Rating Mapper`, () => {
  const entity: RatingEntity = RatingEntity.create(entityParams);
  const ormEntity = new RatingOrmEntity;
  ormEntity.value = entityParams.value;
  ormEntity.userId = entityParams.userId;
  ormEntity.hotelId = entityParams.hotelId;

  describe(`mapToDomain`, () => {
    it('should call create method of RatingEntity', function() {
      RatingEntity.create = jest.fn(RatingEntity.create);
      RatingMapper.mapToDomain(ormEntity);
      expect(RatingEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of RatingEntity with params', function() {
      RatingEntity.create = jest.fn(RatingEntity.create);
      RatingMapper.mapToDomain(ormEntity);
      expect(RatingEntity.create).toHaveBeenCalledWith(entityParams);
    });

    it('should return create method result of RatingEntity', function() {
      RatingEntity.create = jest.fn(RatingEntity.create).mockReturnValue(entity);
      const result = RatingMapper.mapToDomain(ormEntity);
      expect(result).toEqual(entity);
    });
  });

  describe(`mapToOrmEntity`, () => {
    it('should return RatingOrmEntity', function() {
      const result = RatingMapper.mapToOrmEntity(entity);
      expect(result).toEqual(ormEntity);
    });

    it.each([`value`, `userId`, `hotelId`])('should have %p property in result', function(property) {
      const result = RatingMapper.mapToOrmEntity(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
