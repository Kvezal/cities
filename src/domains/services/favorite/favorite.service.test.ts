import { FavoriteEntity, IFavorite } from 'domains/entities';

import { FavoriteService } from './favorite.service';


describe(`Favorite Service`, () => {
  const favoriteParams: IFavorite = {
    value: true,
    userId: `1`,
    hotelId: `1`,
  };
  let favoriteEntity: FavoriteEntity;

  beforeEach(() => {
    favoriteEntity = FavoriteEntity.create(favoriteParams);
  });

  describe(`toggleHotelFavoriteState method`, () => {
    it(`should call loadUserStateOfHotel method`, async () => {
      const loadUserStateOfHotel = jest.fn();
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel},
        {saveUserHotelState: () => null},
        null
      );
      await hotelService.toggleHotelFavoriteState(favoriteParams.userId, favoriteParams.hotelId);
      expect(loadUserStateOfHotel).toHaveBeenCalledTimes(1);
    });

    it(`should call loadUserStateOfHotel method with params`, async () => {
      const loadUserStateOfHotel = jest.fn();
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel},
        {saveUserHotelState: () => null},
        null
      );
      await hotelService.toggleHotelFavoriteState(favoriteParams.userId, favoriteParams.hotelId);
      expect(loadUserStateOfHotel).toHaveBeenCalledWith(favoriteParams.userId, favoriteParams.hotelId);
    });

    it(`should call toggleHotelState method of Feature Entity`, async () => {
      favoriteEntity.toggleFavoriteStateOfHotel = jest.fn(favoriteEntity.toggleFavoriteStateOfHotel);
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel: async () => favoriteEntity},
        null,
        {deleteUserHotelState: async() => null}
      );
      await hotelService.toggleHotelFavoriteState(favoriteParams.userId, favoriteParams.hotelId);
      expect(favoriteEntity.toggleFavoriteStateOfHotel).toHaveBeenCalledTimes(1);
    });

    describe(`if value equal "true"`, () => {
      it(`should call saveUserHotelState method`, async () => {
        const saveUserHotelState = jest.fn();
        const updatedFavoriteEntity = favoriteEntity.toggleFavoriteStateOfHotel();
        const hotelService = new FavoriteService(
          null,
          {loadUserStateOfHotel: async () => updatedFavoriteEntity},
          {saveUserHotelState},
          null
        );
        await hotelService.toggleHotelFavoriteState(favoriteParams.userId, favoriteParams.hotelId);
        expect(saveUserHotelState).toHaveBeenCalledTimes(1);
      });

      it(`should call saveUserHotelState method with Feature Entity`, async () => {
        const updatedFavoriteEntity = favoriteEntity.toggleFavoriteStateOfHotel();
        const saveUserHotelState = jest.fn();
        const hotelService = new FavoriteService(
          null,
          {loadUserStateOfHotel: async () => updatedFavoriteEntity},
          {saveUserHotelState},
          null
        );
        await hotelService.toggleHotelFavoriteState(favoriteParams.userId, favoriteParams.hotelId);
        expect(saveUserHotelState).toHaveBeenCalledWith(favoriteEntity);
      });

      it(`should return result of saveUserHotelState method`, async () => {
        const updatedFavoriteEntity = favoriteEntity.toggleFavoriteStateOfHotel();
        const hotelService = new FavoriteService(
          null,
          {loadUserStateOfHotel: async () => updatedFavoriteEntity},
          {saveUserHotelState: async () => favoriteEntity},
          null
        );
        const toggleFavoriteStateOfHotelForUserResult =
          await hotelService.toggleHotelFavoriteState(favoriteParams.userId, favoriteParams.hotelId);
        expect(toggleFavoriteStateOfHotelForUserResult).toEqual(favoriteEntity);
      });
    });

    describe(`if value equal "false"`, () => {
      it(`should call deleteUserHotelState method`, async () => {
        const deleteUserHotelState = jest.fn();
        const hotelService = new FavoriteService(
          null,
          {loadUserStateOfHotel: async () => favoriteEntity},
          null,
          {deleteUserHotelState}
        );
        await hotelService.toggleHotelFavoriteState(favoriteParams.userId, favoriteParams.hotelId);
        expect(deleteUserHotelState).toHaveBeenCalledTimes(1);
      });

      it(`should call deleteUserHotelState method with Feature Entity`, async () => {
        const updatedFavoriteEntity = favoriteEntity.toggleFavoriteStateOfHotel();
        const deleteUserHotelState = jest.fn();
        const hotelService = new FavoriteService(
          null,
          {loadUserStateOfHotel: async () => favoriteEntity},
          null,
          {deleteUserHotelState}
        );
        await hotelService.toggleHotelFavoriteState(favoriteParams.userId, favoriteParams.hotelId);
        expect(deleteUserHotelState).toHaveBeenCalledWith(updatedFavoriteEntity);
      });

      it(`should return result of deleteUserHotelState method`, async () => {
        const updatedFavoriteEntity = favoriteEntity.toggleFavoriteStateOfHotel();
        const hotelService = new FavoriteService(
          null,
          {loadUserStateOfHotel: async () => favoriteEntity},
          null,
          {deleteUserHotelState: async () => null}
        );
        const toggleFavoriteStateOfHotelForUserResult =
          await hotelService.toggleHotelFavoriteState(favoriteParams.userId, favoriteParams.hotelId);
        expect(toggleFavoriteStateOfHotelForUserResult).toEqual(updatedFavoriteEntity);
      });
    });
  });
});
