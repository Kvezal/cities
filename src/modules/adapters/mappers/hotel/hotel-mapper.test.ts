import { HotelEntity, IHotel } from 'domains/entities';

import {
  CityMapper,
  FeatureMapper,
  HotelTypeMapper,
  ImageMapper,
  LocationMapper,
  UserMapper,
} from '../../mappers';
import { FeatureOrmEntity, ImageOrmEntity } from '../../orm-entities';
import { HotelMapper } from './hotel-mapper';


const ormEntity: IHotel = {
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

describe(`Hotel Mapper`, () => {
  const entity: HotelEntity = HotelEntity.create(ormEntity);

  describe(`mapToDomain`, () => {
    it('should call create method of HotelEntity', function() {
      HotelEntity.create = jest.fn(HotelEntity.create);
      HotelMapper.mapToDomain(ormEntity);
      expect(HotelEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of HotelEntity with params', function() {
      HotelEntity.create = jest.fn(HotelEntity.create);
      HotelMapper.mapToDomain(ormEntity);
      expect(HotelEntity.create).toHaveBeenCalledWith({
        ...ormEntity,
        features: ormEntity.features.map((feature: FeatureOrmEntity) => FeatureMapper.mapToDomain(feature)),
        type: HotelTypeMapper.mapToDomain(ormEntity.type),
        city: CityMapper.mapToDomain(ormEntity.city),
        location: LocationMapper.mapToDomain(ormEntity.location),
        host: UserMapper.mapToDomain(ormEntity.host),
        images: ormEntity.images.map((image: ImageOrmEntity) => ImageMapper.mapToDomain(image)),
      });
    });

    it('should return create method result of HotelEntity', function() {
      HotelEntity.create = jest.fn(HotelEntity.create).mockReturnValue(entity);
      const result = HotelMapper.mapToDomain(ormEntity);
      expect(result).toEqual(entity);
    });
  });

  describe(`mapToOrmEntity`, () => {
    it('should return HotelOrmEntity', function() {
      const result = HotelMapper.mapToOrmEntity(entity);
      expect(result).toEqual(ormEntity);
    });

    it.each([
      `id`,
      `title`,
      `description`,
      `bedroomCount`,
      `maxAdultCount`,
      `price`,
      `isPremium`,
      `rating`,
      `features`,
      `type`,
      `city`,
      `location`,
      `host`,
      `images`
    ])('should have %p property in result', function(property) {
      const result = HotelMapper.mapToOrmEntity(entity);
      expect(result).toHaveProperty(property);
    });
  });
});
