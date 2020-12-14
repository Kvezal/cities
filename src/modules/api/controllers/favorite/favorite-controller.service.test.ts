import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import {
  HotelService,
  hotelServiceSymbol,
} from 'domains/services';

import { FavoriteControllerService } from './favorite-controller.service';
import {
  HotelEntity,
  IHotel,
  IJsonWebTokenParams,
} from 'domains/entities';


const jsonWebTokenParams: IJsonWebTokenParams = {
  id: `008131ec-cb07-499a-86e4-6674afa31532`,
  name: `name`,
  email: `email@gmail.com`,
  image: null,
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
  favorites: [],
};

const expectedHotelOutput = {
  id: `1`,
  title: `title`,
  description: `description`,
  bedroomCount: 4,
  maxAdultCount: 2,
  price: 150,
  isPremium: true,
  rating: 3,
  features: [`title`, `title`],
  type: `title`,
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
    type: `title`,
    image: `title`,
  },
  images: [`title`, `title`],
  isFavorite: false,
}

describe('FavoriteControllerService', () => {
  let service: FavoriteControllerService;
  let hotelService: HotelService;
  const hotelEntity: HotelEntity = HotelEntity.create(hotelParams);

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteControllerService,
        {
          provide: hotelServiceSymbol,
          useValue: {
            toggleHotelFavoriteState: async () => hotelEntity,
          },
        },
      ],
    }).compile();

    service = testModule.get<FavoriteControllerService>(FavoriteControllerService);
    hotelService = testModule.get<HotelService>(hotelServiceSymbol);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`toggleFavoriteStatus method`, () => {

    describe(`toggleHotelFavoriteState method of FavoriteService`, () => {
      it(`should call`, async () => {
        const toggleFavoriteStatus = jest.spyOn(hotelService, `toggleHotelFavoriteState`);
        await service.toggleFavoriteStatus(jsonWebTokenParams.id, hotelParams.id);
        expect(toggleFavoriteStatus).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const toggleFavoriteStatus = jest.spyOn(hotelService, `toggleHotelFavoriteState`);
        await service.toggleFavoriteStatus(jsonWebTokenParams.id, hotelParams.id);
        expect(toggleFavoriteStatus).toHaveBeenCalledWith(jsonWebTokenParams.id, hotelParams.id);
      });
    });

    describe(`transformEntityToOutputData method of HotelControllerService`, () => {
      it(`should call`, async () => {
        service.transformEntityToOutputData = jest.fn(service.transformEntityToOutputData);
        await service.toggleFavoriteStatus(jsonWebTokenParams.id, hotelParams.id);
        expect(service.transformEntityToOutputData).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        service.transformEntityToOutputData = jest.fn(service.transformEntityToOutputData);
        await service.toggleFavoriteStatus(jsonWebTokenParams.id, hotelParams.id);
        expect(service.transformEntityToOutputData).toHaveBeenCalledWith(hotelEntity, jsonWebTokenParams.id);
      });
    });

    it(`should return correct result`, async () => {
      const result = await service.toggleFavoriteStatus(jsonWebTokenParams.id, hotelParams.id);
      expect(result).toEqual(expectedHotelOutput);
    });
  });

  it(`transformEntityToOutputData method should return correct result`, async () => {
    const result = await service.transformEntityToOutputData(hotelEntity, jsonWebTokenParams.id);
    expect(result).toEqual(expectedHotelOutput);
  });
});
