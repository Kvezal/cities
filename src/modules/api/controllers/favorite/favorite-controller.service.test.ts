import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import {
  AuthService,
  authServiceSymbol,
  FavoriteService,
  favoriteServiceSymbol,
} from 'domains/services';

import { FavoriteControllerService } from './favorite-controller.service';
import {
  FavoriteEntity,
  HotelEntity,
  IFavorite,
  IHotel,
  IJsonWebTokenParams,
} from 'domains/entities';
import {
  FavoriteMapper,
  HotelMapper,
  HotelOrmEntity,
} from 'modules/adapters';


const jsonWebTokenParams: IJsonWebTokenParams = {
  id: `008131ec-cb07-499a-86e4-6674afa31532`,
  name: `name`,
  email: `email@gmail.com`,
  image: null,
};

const favoriteParams: IFavorite = {
  value: true,
  userId: `1`,
  hotelId: `1`,
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
};

describe('FavoriteControllerService', () => {
  let service: FavoriteControllerService;
  let favoriteService: FavoriteService;
  let authService: AuthService;
  const accessToken = `access-token`;
  const hotelEntity: HotelEntity = HotelEntity.create(hotelParams);
  const hotelOrmEntity: HotelOrmEntity = HotelMapper.mapToOrmEntity(hotelEntity);
  const favoriteEntity: FavoriteEntity = FavoriteEntity.create(favoriteParams);
  const hotelCount = 3;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteControllerService,
        {
          provide: authServiceSymbol,
          useValue: {
            decodeAccessToken: async () => jsonWebTokenParams,
          },
        },
        {
          provide: favoriteServiceSymbol,
          useValue: {
            getFavoriteHotelList: async () => Array(hotelCount).fill(hotelEntity),
            toggleHotelFavoriteState: async () => favoriteEntity,
          },
        },
      ],
    }).compile();

    service = testModule.get<FavoriteControllerService>(FavoriteControllerService);
    authService = testModule.get<AuthService>(authServiceSymbol);
    favoriteService = testModule.get<FavoriteService>(favoriteServiceSymbol);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`toggleFavoriteStatus method`, () => {
    describe(`decodeAccessToken method of AuthService`, () => {
      it(`should call`, async () => {
        const decodeAccessToken = jest.spyOn(authService, `decodeAccessToken`);
        await service.toggleFavoriteStatus(hotelParams.id, accessToken);
        expect(decodeAccessToken).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const decodeAccessToken = jest.spyOn(authService, `decodeAccessToken`);
        await service.toggleFavoriteStatus(hotelParams.id, accessToken);
        expect(decodeAccessToken).toHaveBeenCalledWith(accessToken);
      });
    });

    describe(`toggleHotelFavoriteState method of FavoriteService`, () => {
      it(`should call`, async () => {
        const toggleFavoriteStatus = jest.spyOn(favoriteService, `toggleHotelFavoriteState`);
        await service.toggleFavoriteStatus(hotelParams.id, accessToken);
        expect(toggleFavoriteStatus).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const toggleFavoriteStatus = jest.spyOn(favoriteService, `toggleHotelFavoriteState`);
        await service.toggleFavoriteStatus(hotelParams.id, accessToken);
        expect(toggleFavoriteStatus).toHaveBeenCalledWith(jsonWebTokenParams.id, hotelParams.id);
      });
    });

    describe(`mapToOrmEntity method of FavoriteMapper`, () => {
      it(`should call`, async () => {
        FavoriteMapper.mapToOrmEntity = jest.fn(FavoriteMapper.mapToOrmEntity);
        await service.toggleFavoriteStatus(hotelParams.id, accessToken);
        expect(FavoriteMapper.mapToOrmEntity).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        FavoriteMapper.mapToOrmEntity = jest.fn(FavoriteMapper.mapToOrmEntity);
        await service.toggleFavoriteStatus(hotelParams.id, accessToken);
        expect(FavoriteMapper.mapToOrmEntity).toHaveBeenCalledWith(favoriteEntity);
      });
    });

    it(`should return correct result`, async () => {
      const favoriteOrmEntity = FavoriteMapper.mapToOrmEntity(favoriteEntity);
      FavoriteMapper.mapToOrmEntity = jest.fn(FavoriteMapper.mapToOrmEntity).mockReturnValueOnce(favoriteOrmEntity);
      const result = await service.toggleFavoriteStatus(hotelParams.id, accessToken);
      expect(result).toBe(favoriteOrmEntity);
    });
  });
});
