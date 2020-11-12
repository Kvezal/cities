import { FavoriteEntity, IFavorite } from '../../entities';
import { FavoriteService } from './favorite.service';


describe(`Favorite Service`, () => {
  const favoriteParams: IFavorite = {
    value: true,
    userId: 1,
    hotelId: 1,
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
      expect(loadFavoriteHotelList.mock.calls).toHaveLength(1);
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
      const loadFavoriteHotelList = jest.fn().mockReturnValue(favoriteEntity);
      const hotelService = new FavoriteService(
        {loadFavoriteHotelList},
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
        null
      );
      await hotelService.toggleFavoriteStateOfHotelForUser(favoriteParams.userId, favoriteParams.hotelId);
      expect(loadUserStateOfHotel.mock.calls).toHaveLength(1);
    });

    it(`should call loadUserStateOfHotel method with params`, async () => {
      const loadUserStateOfHotel = jest.fn();
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel},
        null
      );
      await hotelService.toggleFavoriteStateOfHotelForUser(favoriteParams.userId, favoriteParams.hotelId);
      expect(loadUserStateOfHotel).toHaveBeenCalledWith(favoriteParams.userId, favoriteParams.hotelId);
    });

    it(`should call saveUserHotelState method`, async () => {
      const loadUserStateOfHotel = jest.fn().mockReturnValue(favoriteEntity);
      const saveUserHotelState = jest.fn();
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel},
        {saveUserHotelState}
      );
      await hotelService.toggleFavoriteStateOfHotelForUser(favoriteParams.userId, favoriteParams.hotelId);
      expect(saveUserHotelState.mock.calls).toHaveLength(1);
    });

    it(`should call toggleHotelState method of Feature Entity`, async () => {
      const loadUserStateOfHotel = jest.fn().mockReturnValue(favoriteEntity);
      const toggleFavoriteStateOfHotel = jest.fn();
      const saveUserHotelState = jest.fn();
      Object.setPrototypeOf(favoriteEntity, {toggleFavoriteStateOfHotel});
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel},
        {saveUserHotelState}
      );
      await hotelService.toggleFavoriteStateOfHotelForUser(favoriteParams.userId, favoriteParams.hotelId);
      expect(toggleFavoriteStateOfHotel.mock.calls).toHaveLength(1);
    });

    it(`should call saveUserHotelState method with Feature Entity`, async () => {
      const loadUserStateOfHotel = jest.fn().mockReturnValue(favoriteEntity);
      const toggleFavoriteStateOfHotel = jest.fn().mockReturnValue(favoriteEntity);
      const saveUserHotelState = jest.fn();
      Object.setPrototypeOf(favoriteEntity, {toggleFavoriteStateOfHotel});
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel},
        {saveUserHotelState}
      );
      await hotelService.toggleFavoriteStateOfHotelForUser(favoriteParams.userId, favoriteParams.hotelId);
      expect(saveUserHotelState).toHaveBeenCalledWith(favoriteEntity);
    });

    it(`should return result of saveUserHotelState method`, async () => {
      const loadUserStateOfHotel = jest.fn().mockReturnValue(favoriteEntity);
      const toggleFavoriteStateOfHotel = jest.fn().mockReturnValue(favoriteEntity);
      const saveUserHotelState = jest.fn().mockReturnValue(favoriteEntity);
      Object.setPrototypeOf(favoriteEntity, {toggleFavoriteStateOfHotel});
      const hotelService = new FavoriteService(
        null,
        {loadUserStateOfHotel},
        {saveUserHotelState}
      );
      const result = await hotelService.toggleFavoriteStateOfHotelForUser(favoriteParams.userId, favoriteParams.hotelId);
      expect(result).toEqual(favoriteEntity);
    });
  });
});
