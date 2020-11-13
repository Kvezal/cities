import {
  CityEntity,
  FeatureEntity,
  HotelTypeEntity,
  ILocation,
  ImageEntity,
  LocationEntity,
  UserEntity,
} from 'domains/entities';

import { HotelEntity } from './hotel.entity';
import { IHotel } from './hotel.interface';


const hotelParams: IHotel = {
  id: 1,
  title: `title`,
  description: `description`,
  bedroomCount: 4,
  maxAdultCount: 2,
  price: 150,
  isPremium: true,
  rating: 3,
  features: [
    {
      id: 1,
      title: `title`,
    },
    {
      id: 2,
      title: `title`,
    }
  ],
  type: {
    id: 1,
    title: `title`,
  },
  city: {
    id: 1,
    title: `title`,
    location: {
      id: 1,
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  location: {
    id: 1,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  host: {
    id: 1,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    type: {
      id: 1,
      title: `title`,
    },
    image: {
      id: 1,
      title: `title`,
    },
  },
  images: [
    {
      id: 1,
      title: `title`,
    },
    {
      id: 2,
      title: `title`,
    }
  ],
};

const hotelLocations = [
  {
    id: 1,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  {
    id: 2,
    latitude: 52.366992,
    longitude: 4.898267,
    zoom: 10,
  },
  {
    id: 3,
    latitude: 52.363670,
    longitude: 4.899662,
    zoom: 10,
  },
  {
    id: 4,
    latitude: 52.363290,
    longitude: 4.899823,
    zoom: 10,
  },
  {
    id: 5,
    latitude: 52.362045,
    longitude: 4.901110,
    zoom: 10,
  },
  {
    id: 6,
    latitude: 52.357876,
    longitude: 4.903161,
    zoom: 10,
  },
  {
    id: 7,
    latitude: 52.370508,
    longitude: 4.894957,
    zoom: 10,
  },
  {
    id: 8,
    latitude: 52.370642,
    longitude: 4.894844,
    zoom: 10,
  }
];

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
      );
    });

    it.each(
      [`features`, `type`, `city`, `location`, `host`, `images`],
    )(`should create a new Hotel instance with %p property`, (property) => {
      expect(hotel).toHaveProperty(property);
    });

    it.each(
      [`id`, `title`, `description`, `bedroomCount`, `maxAdultCount`, `price`, `isPremium`, `rating`],
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
      [`id`, `title`, `description`, `bedroomCount`, `maxAdultCount`, `price`, `isPremium`],
    )(`should create a new Hotel instance with correct %p property`, (property) => {
      expect(hotel[property]).toBe(hotelParams[property]);
    });
  });

  describe(`getNearbyHotels method`, () => {
    const hotel = HotelEntity.create(hotelParams);
    const hotelList: HotelEntity[] = hotelLocations.map(
      (location: ILocation) => HotelEntity.create({...hotelParams, location})
    );

    it(`should return 3 hotels`, () => {
      const nearbyHotels = hotel.getNearbyHotelList(hotelList);
      expect(nearbyHotels).toHaveLength(3);
    });

    it(`should return nearest hotel`, () => {
      const nearbyHotels = hotel.getNearbyHotelList(hotelList);
      const nearestLocationIds = nearbyHotels.map((hotel) => hotel.location.id);
      expect(nearestLocationIds).toEqual([7, 8, 2]);
    });
  });
});
