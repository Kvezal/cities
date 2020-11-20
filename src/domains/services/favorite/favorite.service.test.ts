import { FavoriteEntity, IFavorite } from 'domains/entities';

import { FavoriteService } from './favorite.service';


describe(`Favorite Service`, () => {
  const favoriteParams: IFavorite = {
    value: true,
    userId: `1`,
    hotelId: `1`,
  };
  const favoriteEntity = FavoriteEntity.create(favoriteParams);

  describe(`getFavoriteHotelList method`, () => {
    it(`should call loadFavoriteHotelList method`, async () => {
      const loadFavoriteHotelList = jest.fn();
      const hotelService = new FavoriteService(
        {loadFavoriteHotelList},
        null,
        null
      );
      await hotelService.getFavoriteHotelList(favoriteParams.userId);
      expect(loadFavoriteHotelList).toHaveBeenCalledTimes(1);
    });

    it(`should call loadFavoriteHotelList method with params`, async () => {
      const loadFavoriteHotelList = jest.fn();
      const hotelService = new FavoriteService(
        {loadFavoriteHotelList},
        null,
        null
      );
      await hotelService.getFavoriteHotelList(favoriteParams.userId);
      expect(loadFavoriteHotelList).toHaveBeenCalledWith(favoriteParams.userId);
    });

    it(`should return result of loadFavoriteHotelList method`, async () => {
      const hotelService = new FavoriteService(
        {loadFavoriteHotelList: jest.fn().mockReturnValue(favoriteEntity)},
        null,
        null
      );
      const result = await hotelService.getFavoriteHotelList(favoriteParams.userId);
      expect(result).toEqual(favoriteEntity);
    });
  });

  describe(`toggleFavoriteHotelForUser method`, () => {
    it(`should call loadUserStateOfHotel method`, async () => {
      const loadUserStateOfHotel = jest.fn();
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel},
        {saveUserHotelState: () => null}
      );
      await hotelService.toggleFavoriteStateOfHotelForUser(favoriteParams.userId, favoriteParams.hotelId);
      expect(loadUserStateOfHotel).toHaveBeenCalledTimes(1);
    });

    it(`should call loadUserStateOfHotel method with params`, async () => {
      const loadUserStateOfHotel = jest.fn();
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel},
        {saveUserHotelState: () => null}
      );
      await hotelService.toggleFavoriteStateOfHotelForUser(favoriteParams.userId, favoriteParams.hotelId);
      expect(loadUserStateOfHotel).toHaveBeenCalledWith(favoriteParams.userId, favoriteParams.hotelId);
    });

    it(`should call toggleHotelState method of Feature Entity`, async () => {
      const toggleFavoriteStateOfHotel = jest.fn();
      Object.setPrototypeOf(favoriteEntity, {toggleFavoriteStateOfHotel});
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel: jest.fn().mockReturnValue(favoriteEntity)},
        {saveUserHotelState: () => null}
      );
      await hotelService.toggleFavoriteStateOfHotelForUser(favoriteParams.userId, favoriteParams.hotelId);
      expect(toggleFavoriteStateOfHotel).toHaveBeenCalledTimes(1);
    });

    it(`should call saveUserHotelState method`, async () => {
      const saveUserHotelState = jest.fn();
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel: jest.fn().mockReturnValue(favoriteEntity)},
        {saveUserHotelState}
      );
      await hotelService.toggleFavoriteStateOfHotelForUser(favoriteParams.userId, favoriteParams.hotelId);
      expect(saveUserHotelState).toHaveBeenCalledTimes(1);
    });

    it(`should call saveUserHotelState method with Feature Entity`, async () => {
      favoriteEntity.toggleFavoriteStateOfHotel = jest
        .fn(favoriteEntity.toggleFavoriteStateOfHotel)
        .mockReturnValue(favoriteEntity);
      const saveUserHotelState = jest.fn();
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel: jest.fn().mockReturnValue(favoriteEntity)},
        {saveUserHotelState}
      );
      await hotelService.toggleFavoriteStateOfHotelForUser(favoriteParams.userId, favoriteParams.hotelId);
      expect(saveUserHotelState).toHaveBeenCalledWith(favoriteEntity);
    });

    it(`should return result of saveUserHotelState method`, async () => {
      favoriteEntity.toggleFavoriteStateOfHotel = jest
        .fn(favoriteEntity.toggleFavoriteStateOfHotel)
        .mockReturnValue(favoriteEntity);
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel: jest.fn().mockReturnValue(favoriteEntity)},
        {saveUserHotelState: jest.fn().mockReturnValue(favoriteEntity)}
      );
      const toggleFavoriteStateOfHotelForUserResult =
        await hotelService.toggleFavoriteStateOfHotelForUser(favoriteParams.userId, favoriteParams.hotelId);
      expect(toggleFavoriteStateOfHotelForUserResult).toEqual(favoriteEntity);
    });
  });
});
