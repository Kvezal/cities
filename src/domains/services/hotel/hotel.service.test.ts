import {
  HotelEntity,
  IHotel,
  ILocation,
  IUser,
  UserEntity,
} from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';

import { HotelService } from './hotel.service';
import { ESortingFilter } from 'domains/interfaces/hotel-sorting.interface';
import {
  LoadHotelByIdPort,
  LoadUserByIdPort,
  UpdateHotelPort,
} from 'domains/ports';
import {
  EHotelField,
  HotelException,
} from 'domains/exceptions/hotel';
import {
  EUserField,
  UserError,
} from 'domains/exceptions';


const userParams: IUser = {
  id: `1`,
  name: `name`,
  email: `email@gmail.com`,
  password: `password`,
  type: {
    id: `1`,
    title: `title`,
  },
  image: {
    id: `1`,
    title: `title`,
  },
};

const hotelParams: IHotel = {
  id: `1`,
  title: `title`,
  description: `description`,
  bedroomCount: 4,
  maxAdultCount: 2,
  price: 150,
  isPremium: true,
  rating: 3,
  features: [
    {
      id: `1`,
      title: `title`,
    },
    {
      id: `2`,
      title: `title`,
    }
  ],
  type: {
    id: `1`,
    title: `title`,
  },
  city: {
    id: `1`,
    title: `title`,
    location: {
      id: `1`,
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  location: {
    id: `1`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  host: {
    id: `1`,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    type: {
      id: `1`,
      title: `title`,
    },
    image: {
      id: `1`,
      title: `title`,
    },
  },
  images: [
    {
      id: `1`,
      title: `title`,
    },
    {
      id: `2`,
      title: `title`,
    }
  ],
  favorites: [userParams],
};

const hotelSortingParams: IHotelSortingParams = {
  cityId: `1`,
};

const hotelLocations = [
  {
    id: `1`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  {
    id: `2`,
    latitude: 52.366992,
    longitude: 4.898267,
    zoom: 10,
  },
  {
    id: `3`,
    latitude: 52.363670,
    longitude: 4.899662,
    zoom: 10,
  },
  {
    id: `4`,
    latitude: 52.363290,
    longitude: 4.899823,
    zoom: 10,
  },
  {
    id: `5`,
    latitude: 52.362045,
    longitude: 4.901110,
    zoom: 10,
  },
  {
    id: `6`,
    latitude: 52.357876,
    longitude: 4.903161,
    zoom: 10,
  },
  {
    id: `7`,
    latitude: 52.370508,
    longitude: 4.894957,
    zoom: 10,
  },
  {
    id: `8`,
    latitude: 52.370642,
    longitude: 4.894844,
    zoom: 10,
  }
];

describe(`Hotel Service`, () => {
  const hotelEntity = HotelEntity.create(hotelParams);
  const userEntity = UserEntity.create(userParams);

  describe(`getHotelList method`, () => {
    describe(`if sorting filter isn't nearby`, () => {
      let result: HotelEntity[];
      const hotelEntityList = [hotelEntity];
      let loadHotelList;

      beforeEach(async () => {
        loadHotelList = jest.fn().mockResolvedValue(hotelEntityList);
        const hotelService = new HotelService(
          {loadHotelList},
          null,
          null,
          null
        );
        result = await hotelService.getHotelList(hotelSortingParams);
      });

      it(`should return result`, async () => {
        expect(result).toEqual(hotelEntityList);
      });

      describe(`loadHotelList method of HotelListLoaderService`, () => {
        it(`should call loadHotelList method`, async () => {
          expect(loadHotelList).toHaveBeenCalledTimes(1);
        });

        it(`should call loadHotelList method with sorting params`, async () => {
          expect(loadHotelList).toHaveBeenCalledWith(hotelSortingParams);
        });
      });
    });

    describe(`if sorting filter is nearby`, () => {
      const hotelEntityList: HotelEntity[] = hotelLocations.map(
        (location: ILocation) => HotelEntity.create({...hotelParams, location})
      );

      it(`should return result of getNearbyHotels method`, async () => {
        const expectedHotelEntityList = hotelEntityList.slice(0, 3);
        hotelEntity.getNearbyHotelList = jest.fn(hotelEntity.getNearbyHotelList).mockReturnValue(expectedHotelEntityList);
        const hotelService = new HotelService(
          {loadHotelList: async () => hotelEntityList},
          {loadHotelById: async () => hotelEntity},
          null,
          null
        );
        const nearbyHotels = await hotelService.getHotelList({
          hotelId: hotelParams.id,
          filter: ESortingFilter.NEARBY,
        });
        expect(nearbyHotels).toEqual(expectedHotelEntityList);
      });

      describe(`loadHotelById method of HotelLoaderService`, () => {
        const loadHotelById = jest.fn().mockReturnValue(hotelEntity);

        beforeEach(async () => {
          const hotelService = new HotelService(
            {loadHotelList: async () => hotelEntityList},
            {loadHotelById},
            null,
            null
          );
          await hotelService.getHotelList({
            hotelId: hotelParams.id,
            filter: ESortingFilter.NEARBY,
          });
        });

        it(`should call loadHotelById method`, async () => {
          expect(loadHotelById).toHaveBeenCalledTimes(1);
        });

        it(`should call loadHotelById method with correct param`, async () => {
          expect(loadHotelById).toHaveBeenCalledWith(hotelParams.id);
        });
      });

      describe(`loadHotelList method of HotelListLoaderService`, () => {
        it(`should call`, async () => {
          const loadHotelList = jest.fn().mockReturnValue(hotelEntityList);
          const hotelService = new HotelService(
            {loadHotelList},
            {loadHotelById: async () => hotelEntity},
            null,
            null
          );
          await hotelService.getHotelList({
            hotelId: hotelParams.id,
            filter: ESortingFilter.NEARBY,
          });
          expect(loadHotelList).toHaveBeenCalledTimes(1);
        });

        it(`should call with params`, async () => {
          const loadHotelList = jest.fn().mockReturnValue(hotelEntityList);
          const hotelService = new HotelService(
            {loadHotelList},
            {loadHotelById: async () => hotelEntity},
            null,
            null
          );
          await hotelService.getHotelList({
            hotelId: hotelParams.id,
            filter: ESortingFilter.NEARBY,
          });
          expect(loadHotelList).toHaveBeenCalledWith({
            cityId: hotelEntity.city.id,
            hotelId: hotelParams.id,
            filter: ESortingFilter.NEARBY,
          });
        });
      });

      describe(`getNearbyHotels method of hotelEntity instance`, () => {
        it(`should call`, async () => {
          hotelEntity.getNearbyHotelList = jest.fn(hotelEntity.getNearbyHotelList);
          const hotelService = new HotelService(
            {loadHotelList: async () => hotelEntityList},
            {loadHotelById: async () => hotelEntity},
            null,
            null
          );
          await hotelService.getHotelList({
            hotelId: hotelParams.id,
            filter: ESortingFilter.NEARBY,
          });
          expect(hotelEntity.getNearbyHotelList).toHaveBeenCalledTimes(1);
        });

        it(`should call with params`, async () => {
          hotelEntity.getNearbyHotelList = jest.fn(hotelEntity.getNearbyHotelList);
          const hotelService = new HotelService(
            {loadHotelList: async () => hotelEntityList},
            {loadHotelById: async () => hotelEntity},
            null,
            null
          );
          await hotelService.getHotelList({
            hotelId: hotelParams.id,
            filter: ESortingFilter.NEARBY,
          });
          expect(hotelEntity.getNearbyHotelList).toHaveBeenCalledWith(hotelEntityList);
        });
      });
    });
  });

  describe(`getHotelById method`, () => {
    it(`should call loadHotelById method`, async () => {
      const loadHotelById = jest.fn();
      const hotelService = new HotelService(
        null,
        {loadHotelById},
        null,
        null
      );
      await hotelService.getHotelById(hotelParams.id);
      expect(loadHotelById).toHaveBeenCalledTimes(1);
    });

    it(`should return result of loadHotelById method`, async () => {
      const hotelService = new HotelService(
        null,
        {loadHotelById: async () => hotelEntity},
        null,
        null
      );
      const hotelResult = await hotelService.getHotelById(hotelParams.id);
      expect(hotelResult).toEqual(hotelEntity);
    });
  });

  describe(`toggleHotelFavoriteState method`, () => {
    let hotelService: HotelService;
    const hotelLoaderService: LoadHotelByIdPort = {loadHotelById: async () => hotelEntity};
    const userLoaderService: LoadUserByIdPort = {loadUserById: async () => userEntity};
    const hotelUpdaterService: UpdateHotelPort = {updateHotel: async () => hotelEntity};


    beforeEach(async () => {
      hotelService = new HotelService(
        null,
        hotelLoaderService,
        userLoaderService,
        hotelUpdaterService
      );
    });

    it(`should return result`, async () => {
      const result = await hotelService.toggleHotelFavoriteState(hotelParams.id, userParams.id);
      expect(result).toBe(hotelEntity);
    });

    it(`should throw HotelException if user doesn't exist`, async () => {
      hotelLoaderService.loadHotelById = jest.fn(hotelLoaderService.loadHotelById).mockImplementationOnce(async () => null);
      await expect(hotelService.toggleHotelFavoriteState(userEntity.id, hotelParams.id)).rejects
        .toThrow(new HotelException({
          field: EHotelField.ID,
          message: `Hotel with ${hotelParams.id} doesn't exist`,
        }));
    });

    it(`should throw HotelException if user doesn't exist`, async () => {
      userLoaderService.loadUserById = jest.fn(userLoaderService.loadUserById).mockImplementationOnce(async () => null);
      await expect(hotelService.toggleHotelFavoriteState(userEntity.id, hotelParams.id)).rejects
        .toThrow(new UserError({
          field: EUserField.ID,
          message: `User with ${userParams.id} doesn't exist`,
        }));
    });

    describe(`getHotelById method`, () => {
      it(`should call`, async () => {
        hotelService.getHotelById = jest.fn(hotelService.getHotelById);
        await hotelService.toggleHotelFavoriteState(userParams.id, hotelParams.id);
        expect(hotelService.getHotelById).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        hotelService.getHotelById = jest.fn(hotelService.getHotelById);
        await hotelService.toggleHotelFavoriteState(userParams.id, hotelParams.id);
        expect(hotelService.getHotelById).toHaveBeenCalledWith(hotelParams.id);
      });
    });

    describe(`loadUserById method of UserLoaderService`, () => {
      it(`should call`, async () => {
        userLoaderService.loadUserById = jest.fn(userLoaderService.loadUserById);
        await hotelService.toggleHotelFavoriteState(userParams.id, hotelParams.id);
        expect(userLoaderService.loadUserById).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        userLoaderService.loadUserById = jest.fn(userLoaderService.loadUserById);
        await hotelService.toggleHotelFavoriteState(userParams.id, hotelParams.id);
        expect(userLoaderService.loadUserById).toHaveBeenCalledWith(userParams.id);
      });
    });

    describe(`toggleFavorite method of hotel instance`, () => {
      it(`should call`, async () => {
        hotelEntity.toggleFavorite = jest.fn(hotelEntity.toggleFavorite);
        await hotelService.toggleHotelFavoriteState(userParams.id, hotelParams.id);
        expect(hotelEntity.toggleFavorite).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        hotelEntity.toggleFavorite = jest.fn(hotelEntity.toggleFavorite);
        await hotelService.toggleHotelFavoriteState(userParams.id, hotelParams.id);
        expect(hotelEntity.toggleFavorite).toHaveBeenCalledWith(userEntity);
      });
    });

    describe(`updateHotel method of HotelUpdaterService`, () => {
      it(`should call`, async () => {
        hotelUpdaterService.updateHotel = jest.fn(hotelUpdaterService.updateHotel);
        await hotelService.toggleHotelFavoriteState(userParams.id, hotelParams.id);
        expect(hotelUpdaterService.updateHotel).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        await hotelService.toggleHotelFavoriteState(userParams.id, hotelParams.id);
        expect(hotelUpdaterService.updateHotel).toBeCalledWith(hotelEntity);
      });
    });
  })
});
