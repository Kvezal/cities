import {
  FavoriteEntity,
  IFavorite,
} from 'domains/entities';


const favoriteEntityParams: IFavorite = {
  hotelId: `c17dab56-94f8-4d86-9835-221b5b7291f2`,
  userId: `cbf10244-cae7-47ac-b385-b2ceb103051a`,
  value: false,
};

describe(`Favorite entity`, () => {
  describe(`constructor`, () => {
    it.each(
      [`hotelId`, `userId`, `value`],
    )(`should create a new Favorite instance with correct %p property`, (property: string) => {
      const favorite = FavoriteEntity.create(favoriteEntityParams);
      expect(favorite[property]).toBe(favoriteEntityParams[property]);
    });
  });

  describe(`create method`, () => {
    it.each(
      [`hotelId`, `userId`, `value`],
    )(`should create a new Favorite instance with correct %p property`, (property: string) => {
      const favorite = FavoriteEntity.create(favoriteEntityParams);
      expect(favorite[property]).toBe(favoriteEntityParams[property]);
    });
  });
});
