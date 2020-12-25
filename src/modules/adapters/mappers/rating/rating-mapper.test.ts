import { IRating, RatingEntity } from 'domains/entities';
import { IRatingTableParams } from 'modules/db/interfaces';

import { RatingMapper } from './rating-mapper';


const ratingTableParams: IRatingTableParams = {
  value: 4,
  user_id: `1008131ec-cb07-499a-86e4-6674afa31532`,
  hotel_id: `1008131ec-cb07-499a-86e4-6674afa31532`,
};

const ratingEntityParams: IRating = {
  value: ratingTableParams.value,
  userId: ratingTableParams.user_id,
  hotelId: ratingTableParams.hotel_id,
};

describe(`Rating Mapper`, () => {
  const ratingEntity: RatingEntity = RatingEntity.create(ratingEntityParams);

  describe(`mapToDomain`, () => {
    it('should call create method of RatingEntity', function() {
      RatingEntity.create = jest.fn(RatingEntity.create);
      RatingMapper.mapToDomain(ratingTableParams);
      expect(RatingEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of RatingEntity with params', function() {
      RatingEntity.create = jest.fn(RatingEntity.create);
      RatingMapper.mapToDomain(ratingTableParams);
      expect(RatingEntity.create).toHaveBeenCalledWith(ratingEntityParams);
    });

    it('should return create method result of RatingEntity', function() {
      RatingEntity.create = jest.fn(RatingEntity.create).mockReturnValue(ratingEntity);
      const result: RatingEntity = RatingMapper.mapToDomain(ratingTableParams);
      expect(result).toEqual(ratingEntity);
    });

    it.each([`value`, `userId`, `hotelId`])('should have %p property in result', function(property: string) {
      const result: RatingEntity = RatingMapper.mapToDomain(ratingTableParams);
      expect(result).toHaveProperty(property);
    });
  });

  describe(`mapToTableParams`, () => {
    it('should return RatingOrmEntity', function() {
      const result: IRatingTableParams = RatingMapper.mapToTableParams(ratingEntity);
      expect(result).toEqual(ratingTableParams);
    });

    it.each([`value`, `user_id`, `hotel_id`])('should have %p property in result', function(property: string) {
      const result: IRatingTableParams = RatingMapper.mapToTableParams(ratingEntity);
      expect(result).toHaveProperty(property);
    });
  });
});
