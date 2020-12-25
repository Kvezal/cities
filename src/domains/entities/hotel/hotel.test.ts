import {
  CityEntity,
  FeatureEntity,
  HotelTypeEntity,
  ImageEntity,
  LocationEntity,
  UserEntity,
} from 'domains/entities';

import { HotelEntity } from './hotel.entity';
import { IHotel } from './hotel.interface';


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
  isFavorite: false,
};

describe(`Hotel entity`, () => {
  describe(`constructor`, () => {
    let hotel: HotelEntity;

    beforeAll(() => {
      hotel = new HotelEntity(
        hotelParams.id,
        hotelParams.title,
        hotelParams.description,
        hotelParams.bedroomCount,
        hotelParams.maxAdultCount,
        hotelParams.price,
        hotelParams.isPremium,
        hotelParams.rating,
        hotelParams.features.map(FeatureEntity.create),
        HotelTypeEntity.create(hotelParams.type),
        CityEntity.create(hotelParams.city),
        LocationEntity.create(hotelParams.location),
        UserEntity.create(hotelParams.host),
        hotelParams.images.map(ImageEntity.create),
        hotelParams.isFavorite,
      );
    });

    it.each(
      [`features`, `type`, `city`, `location`, `host`, `images`],
    )(`should create a new Hotel instance with %p property`, (property) => {
      expect(hotel).toHaveProperty(property);
    });

    it.each(
      [`id`, `title`, `description`, `bedroomCount`, `maxAdultCount`, `price`, `isPremium`, `rating`, `isFavorite`],
    )(`should create a new Hotel instance with correct %p property`, (property) => {
      expect(hotel[property]).toBe(hotelParams[property]);
    });
  });

  describe(`create method`, () => {
    let hotel: HotelEntity;

    beforeAll(() => {
      hotel = HotelEntity.create(hotelParams);
    });

    it.each(
      [`features`, `type`, `city`, `location`, `host`, `images`],
    )(`should create a new Hotel instance with %p property`, (property) => {
      expect(hotel).toHaveProperty(property);
    });

    it.each(
      [`id`, `title`, `description`, `bedroomCount`, `maxAdultCount`, `price`, `isPremium`, `rating`, `isFavorite`],
    )(`should create a new Hotel instance with correct %p property`, (property) => {
      expect(hotel[property]).toBe(hotelParams[property]);
    });
  });
});
