import { FavoriteEntity } from './favorite.entity';
import { IFavorite } from './favorite.interface';


const favoriteParams: IFavorite = {
  value: true,
  userId: 1,
  hotelId: 1,
};

describe(`Favorite entity`, () => {
  describe(`constructor`, () => {
    let favorite: FavoriteEntity;

    beforeAll(() => {
      favorite = new FavoriteEntity(
        favoriteParams.value,
        favoriteParams.userId,
        favoriteParams.hotelId
      );
    });

    it.each([`value`, `userId`, `hotelId`])(`should create a new Favorite instance with correct %p property`, (property) => {
      expect(favorite[property]).toBe(favoriteParams[property]);
    });
  });

  describe(`create method`, () => {
    let favorite: FavoriteEntity;

    beforeAll(() => {
      favorite = FavoriteEntity.create(favoriteParams);
    });

    it.each([`value`, `userId`, `hotelId`])(`should create a new Favorite instance with correct %p property`, (property) => {
      expect(favorite[property]).toBe(favoriteParams[property]);
    });
  });
});
