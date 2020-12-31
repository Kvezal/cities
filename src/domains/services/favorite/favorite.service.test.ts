import { FavoriteService } from 'domains/services';
import {
  DeleteFavoritePort,
  LoadFavoritePort,
  LoadHotelByIdPort,
  LoadUserByIdPort,
  SaveFavoritePort,
} from 'domains/ports';
import {
  FavoriteEntity,
  HotelEntity,
  IHotel,
  IUser,
  UserEntity,
} from 'domains/entities';
import {
  EHotelField,
  HotelException,
} from 'domains/exceptions/hotel';
import {
  EUserField,
  UserError,
} from 'domains/exceptions';


const hotelParams: IHotel = {
  id: `4d348ea5-fb35-4085-b2be-5bee2655bf31`,
  title: `title`,
  description: `description`,
  bedroomCount: 4,
  maxAdultCount: 2,
  price: 150,
  isPremium: true,
  rating: 3,
  features: [
    {
      id: `8ddf062f-8d34-4719-80dd-c3f70ac3055f`,
      title: `title`,
    },
    {
      id: `934928b7-90e5-4482-8967-941b84b08994`,
      title: `title`,
    }
  ],
  type: {
    id: `93498b22-73e4-40ab-a632-faf9ff7da893`,
    title: `title`,
  },
  city: {
    id: `c17dab56-94f8-4d86-9835-221b5b7291f2`,
    title: `title`,
    location: {
      id: `cbf10244-cae7-47ac-b385-b2ceb103051a`,
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  location: {
    id: `d3db316e-dbe7-43af-b1a9-b184d4baa264`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  host: {
    id: `d9f29621-4739-4305-a72f-90a04542cb28`,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    type: {
      id: `db709632-439a-4c90-a151-044e28919754`,
      title: `title`,
    },
    image: {
      id: `e8c1ee3c-0070-4902-b840-7cf94ea3c049`,
      title: `title`,
    },
  },
  images: [
    {
      id: `fb847d59-7745-43ae-b7d5-c5fec95d1efc`,
      title: `title`,
    },
    {
      id: `fa4c59d8-1984-4d4e-b623-8e0be8314133`,
      title: `title`,
    }
  ],
  isFavorite: false,
};

const userParams: IUser = {
  id: `1`,
  name: `name`,
  email: `email@gmail.com`,
  password: `password`,
  image: {
    id: `1`,
    title: `title`,
  },
  type: {
    id: `1`,
    title: `title`,
  },
};

describe(`Favorite service`, () => {
  const userEntity = UserEntity.create(userParams);
  const hotelEntity = HotelEntity.create(hotelParams);

  let favoriteService: FavoriteService;
  const hotelLoaderService: LoadHotelByIdPort = {
    loadHotelById: async () => hotelEntity,
  };
  const userLoaderService: LoadUserByIdPort = {
    loadUserById: async () => userEntity,
  };
  const favoriteLoaderService: LoadFavoritePort = {
    loadFavorite: async () => FavoriteEntity.create({
      userId: userEntity.id,
      hotelId: hotelEntity.id,
      value: false,
    }),
  };
  const favoriteSaverService: SaveFavoritePort = {
    saveFavorite: async () => null,
  };
  const favoriteDeleterService: DeleteFavoritePort = {
    deleteFavorite: async () => null,
  };

  beforeEach(async () => {
    favoriteService = new FavoriteService(
      hotelLoaderService,
      userLoaderService,
      favoriteLoaderService,
      favoriteSaverService,
      favoriteDeleterService,
    );
  });

  describe(`toggleFavorite method`, () => {
    describe(`loadHotelById method of LoadHotelByIdPort`, () => {
      it(`should call`, async () => {
        hotelLoaderService.loadHotelById = jest.fn(hotelLoaderService.loadHotelById);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(hotelLoaderService.loadHotelById).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        hotelLoaderService.loadHotelById = jest.fn(hotelLoaderService.loadHotelById);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(hotelLoaderService.loadHotelById).toHaveBeenCalledWith({
          hotelId: hotelParams.id,
        });
      });

      it(`should throw exception if hotel doesn't exist`, async () => {
        hotelLoaderService.loadHotelById = jest.fn(hotelLoaderService.loadHotelById).mockResolvedValueOnce(null);
        await expect(favoriteService.toggleFavorite(userParams.id, hotelParams.id))
          .rejects
          .toThrow(new HotelException({
            field: EHotelField.ID,
            message: `Hotel with ${hotelParams.id} id doesn't exist`,
          }));
      });
    });

    describe(`loadUserById method of LoadUserByIdPort`, () => {
      it(`should call`, async () => {
        userLoaderService.loadUserById = jest.fn(userLoaderService.loadUserById);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(userLoaderService.loadUserById).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        userLoaderService.loadUserById = jest.fn(userLoaderService.loadUserById);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(userLoaderService.loadUserById).toHaveBeenCalledWith(userParams.id);
      });

      it(`should throw exception if hotel doesn't exist`, async () => {
        userLoaderService.loadUserById = jest.fn(userLoaderService.loadUserById).mockResolvedValueOnce(null);
        await expect(favoriteService.toggleFavorite(userParams.id, hotelParams.id))
          .rejects
          .toThrow(new UserError({
            field: EUserField.ID,
            message: `User with ${userParams.id} doesn't exist`,
          }));
      });
    });

    describe(`loadFavorite method of LoadFavoritePort`, () => {
      it(`should call`, async () => {
        favoriteLoaderService.loadFavorite = jest.fn(favoriteLoaderService.loadFavorite);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(favoriteLoaderService.loadFavorite).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        favoriteLoaderService.loadFavorite = jest.fn(favoriteLoaderService.loadFavorite);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(favoriteLoaderService.loadFavorite).toHaveBeenCalledWith(userParams.id, hotelParams.id);
      });
    });

    describe(`toggle method of FavoriteEntity`, () => {
      const favoriteEntity = FavoriteEntity.create({
        userId: userEntity.id,
        hotelId: hotelEntity.id,
        value: false,
      });

      it(`should call`, async () => {
        favoriteEntity.toggle = jest.fn(favoriteEntity.toggle);
        favoriteLoaderService.loadFavorite = jest.fn(favoriteLoaderService.loadFavorite)
          .mockResolvedValueOnce(favoriteEntity);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(favoriteEntity.toggle).toHaveBeenCalledTimes(1);
      });

      it(`should call without params`, async () => {
        favoriteEntity.toggle = jest.fn(favoriteEntity.toggle);
        favoriteLoaderService.loadFavorite = jest.fn(favoriteLoaderService.loadFavorite)
          .mockResolvedValueOnce(favoriteEntity);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(favoriteEntity.toggle).toHaveBeenCalledWith();
      });
    })

    describe(`saveFavorite method of SaveFavoritePort`, () => {
      it(`should call`, async () => {
        favoriteLoaderService.loadFavorite = jest.fn(favoriteLoaderService.loadFavorite)
          .mockResolvedValueOnce(FavoriteEntity.create({
            userId: userEntity.id,
            hotelId: hotelEntity.id,
            value: false,
          }));
        favoriteSaverService.saveFavorite = jest.fn(favoriteSaverService.saveFavorite);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(favoriteSaverService.saveFavorite).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        favoriteLoaderService.loadFavorite = jest.fn(favoriteLoaderService.loadFavorite)
          .mockResolvedValueOnce(FavoriteEntity.create({
            userId: userEntity.id,
            hotelId: hotelEntity.id,
            value: false,
          }));
        favoriteSaverService.saveFavorite = jest.fn(favoriteSaverService.saveFavorite);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(favoriteSaverService.saveFavorite).toHaveBeenCalledWith(
          FavoriteEntity.create({
            userId: userEntity.id,
            hotelId: hotelEntity.id,
            value: true,
          })
        );
      });

      it(`shouldn't call`, async () => {
        favoriteLoaderService.loadFavorite = jest.fn(favoriteLoaderService.loadFavorite)
          .mockResolvedValueOnce(FavoriteEntity.create({
            userId: userEntity.id,
            hotelId: hotelEntity.id,
            value: true,
          }));
        favoriteSaverService.saveFavorite = jest.fn(favoriteSaverService.saveFavorite);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(favoriteSaverService.saveFavorite).toHaveBeenCalledTimes(0);
      })
    });

    describe(`deleteFavorite method of DeleteFavoritePort`, () => {
      it(`should call`, async () => {
        favoriteLoaderService.loadFavorite = jest.fn(favoriteLoaderService.loadFavorite)
          .mockResolvedValueOnce(FavoriteEntity.create({
            userId: userEntity.id,
            hotelId: hotelEntity.id,
            value: true,
          }));
        favoriteDeleterService.deleteFavorite = jest.fn(favoriteDeleterService.deleteFavorite);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(favoriteDeleterService.deleteFavorite).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        favoriteLoaderService.loadFavorite = jest.fn(favoriteLoaderService.loadFavorite)
          .mockResolvedValueOnce(FavoriteEntity.create({
            userId: userEntity.id,
            hotelId: hotelEntity.id,
            value: true,
          }));
        favoriteDeleterService.deleteFavorite = jest.fn(favoriteDeleterService.deleteFavorite);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(favoriteDeleterService.deleteFavorite).toHaveBeenCalledWith(
          FavoriteEntity.create({
            userId: userEntity.id,
            hotelId: hotelEntity.id,
            value: false,
          })
        );
      });

      it(`shouldn't call`, async () => {
        favoriteLoaderService.loadFavorite = jest.fn(favoriteLoaderService.loadFavorite)
          .mockResolvedValueOnce(FavoriteEntity.create({
            userId: userEntity.id,
            hotelId: hotelEntity.id,
            value: false,
          }));
        favoriteDeleterService.deleteFavorite = jest.fn(favoriteDeleterService.deleteFavorite);
        await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
        expect(favoriteDeleterService.deleteFavorite).toHaveBeenCalledTimes(0);
      });
    });


    it(`should return correct result if favorite exists`, async () => {
      const favoriteEntity = FavoriteEntity.create({
        userId: userEntity.id,
        hotelId: hotelEntity.id,
        value: true,
      });
      favoriteLoaderService.loadFavorite = jest.fn(favoriteLoaderService.loadFavorite)
        .mockResolvedValueOnce(FavoriteEntity.create({
          userId: userEntity.id,
          hotelId: hotelEntity.id,
          value: false,
        }));
      favoriteSaverService.saveFavorite = jest.fn(favoriteSaverService.saveFavorite).mockResolvedValueOnce(favoriteEntity);
      const result = await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
      expect(result).toEqual(favoriteEntity);
    })

    it(`should return correct result if favorite doesn't exist`, async () => {
      const favoriteEntity = FavoriteEntity.create({
        userId: userEntity.id,
        hotelId: hotelEntity.id,
        value: false,
      });
      favoriteLoaderService.loadFavorite = jest.fn(favoriteLoaderService.loadFavorite)
        .mockResolvedValueOnce(FavoriteEntity.create({
          userId: userEntity.id,
          hotelId: hotelEntity.id,
          value: true,
        }));
      favoriteDeleterService.deleteFavorite = jest.fn(favoriteDeleterService.deleteFavorite).mockResolvedValueOnce(favoriteEntity);
      const result = await favoriteService.toggleFavorite(userParams.id, hotelParams.id);
      expect(result).toEqual(favoriteEntity);
    })
  });
});