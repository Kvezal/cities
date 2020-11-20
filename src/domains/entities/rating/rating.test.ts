import { IRating } from './rating.interface';
import { RatingEntity } from './rating.entity';


const ratingParams: IRating = {
  value: 4,
  userId: `1`,
  hotelId: `1`,
};

describe(`Rating entity`, () => {
  describe(`constructor`, () => {
    let rating: IRating;

    beforeAll(() => {
      rating = new RatingEntity(
        ratingParams.value,
        ratingParams.userId,
        ratingParams.hotelId
      );
    });

    it.each([`value`, `userId`, `hotelId`])(`should create a new Rating instance with correct %p property`, (property) => {
      expect(rating[property]).toBe(ratingParams[property]);
    });
  });

  describe(`create method`, () => {
    let rating: IRating;

    beforeAll(() => {
      rating = RatingEntity.create(ratingParams);
    });

    it.each([`value`, `userId`, `hotelId`])(`should create a new Rating instance with correct %p property`, (property) => {
      expect(rating[property]).toBe(ratingParams[property]);
    });
  });
});
