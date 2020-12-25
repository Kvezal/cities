import { HotelEntity, IHotel } from 'domains/entities';
import {
  IFeatureTableParams,
  IHotelTableParams,
  IImageTableParams,
} from 'modules/db/interfaces';

import { CityMapper } from '../city';
import { FeatureMapper } from '../feature';
import {HotelTypeMapper} from '../hotel-type';
import {ImageMapper} from '../image';
import {LocationMapper} from '../location';
import {UserMapper} from '../user';
import { HotelMapper } from './hotel-mapper';


const hotelTableParams: IHotelTableParams = {
  id: `1008131ec-cb07-499a-86e4-6674afa31532`,
  title: `title`,
  description: `description`,
  bedroom_count: 4,
  max_adult_count: 2,
  price: 150,
  is_premium: true,
  rating: 3,
  features: [
    {
      id: `1tpn31ec-cb07-499a-86e4-6674afa31536`,
      title: `title`,
    },
    {
      id: `1008131ec-cb07-499a-86e4-6674afa31532`,
      title: `title`,
    }
  ],
  type: {
    id: `1008131ec-cb07-499a-86e4-6674afa31532`,
    title: `title`,
  },
  city: {
    id: `1008131ec-cb07-499a-86e4-6674afa31532`,
    title: `title`,
    location: {
      id: `1008131ec-cb07-499a-86e4-6674afa31532`,
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
  },
  location: {
    id: `1008131ec-cb07-499a-86e4-6674afa31532`,
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  host: {
    id: `1008131ec-cb07-499a-86e4-6674afa31532`,
    name: `name`,
    email: `email@gmail.com`,
    password: `password`,
    type: {
      id: `1008131ec-cb07-499a-86e4-6674afa31532`,
      title: `title`,
    },
    image: {
      id: `1008131ec-cb07-499a-86e4-6674afa31532`,
      title: `title`,
    },
  },
  images: [
    {
      id: `1008131ec-cb07-499a-86e4-6674afa31532`,
      title: `title`,
    },
    {
      id: `1015793ec-cb07-499a-86e4-6674afa31532`,
      title: `title`,
    }
  ],
  is_favorite: false,
};

const hotelEntityParams: IHotel = {
  id: hotelTableParams.id,
  title: hotelTableParams.title,
  description: hotelTableParams.description,
  bedroomCount: hotelTableParams.bedroom_count,
  maxAdultCount: hotelTableParams.max_adult_count,
  price: hotelTableParams.price,
  isPremium: hotelTableParams.is_premium,
  rating: hotelTableParams.rating,
  features: hotelTableParams.features.map((feature: IFeatureTableParams) => ({
    id: feature.id,
    title: feature.title,
  })),
  type: {
    id: hotelTableParams.type.id,
    title: hotelTableParams.type.title,
  },
  city: {
    id: hotelTableParams.city.id,
    title: hotelTableParams.city.title,
    location: {
      id: hotelTableParams.city.location.id,
      latitude: hotelTableParams.city.location.latitude,
      longitude: hotelTableParams.city.location.longitude,
      zoom: hotelTableParams.city.location.zoom,
    }
  },
  location: {
    id: hotelTableParams.location.id,
    latitude: hotelTableParams.location.latitude,
    longitude: hotelTableParams.location.longitude,
    zoom: hotelTableParams.location.zoom,
  },
  host: {
    id: hotelTableParams.host.id,
    email: hotelTableParams.host.email,
    name: hotelTableParams.host.name,
    password: hotelTableParams.host.password,
    type: {
      id: hotelTableParams.host.type.id,
      title: hotelTableParams.host.type.title,
    },
    image: {
      id: hotelTableParams.host.image.id,
      title: hotelTableParams.host.image.title,
    }
  },
  images: hotelTableParams.images.map((image: IImageTableParams) => ({
    id: image.id,
    title: image.title,
  })),
  isFavorite: hotelTableParams.is_favorite,
}

describe(`Hotel Mapper`, () => {
  const hotelEntity: HotelEntity = HotelEntity.create(hotelEntityParams);

  describe(`mapToDomain`, () => {
    it('should call create method of HotelEntity', function() {
      HotelEntity.create = jest.fn(HotelEntity.create);
      HotelMapper.mapToDomain(hotelTableParams);
      expect(HotelEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of HotelEntity with params', function() {
      HotelEntity.create = jest.fn(HotelEntity.create);
      HotelMapper.mapToDomain(hotelTableParams);
      expect(HotelEntity.create).toHaveBeenCalledWith({
        ...hotelEntityParams,
        features: hotelEntityParams.features.map((feature: IFeatureTableParams) => FeatureMapper.mapToDomain(feature)),
        type: HotelTypeMapper.mapToDomain(hotelEntityParams.type),
        city: CityMapper.mapToDomain(hotelEntityParams.city),
        location: LocationMapper.mapToDomain(hotelEntityParams.location),
        host: UserMapper.mapToDomain(hotelEntityParams.host),
        images: hotelEntityParams.images.map((image: IImageTableParams) => ImageMapper.mapToDomain(image)),
      });
    });

    it('should return create method result of HotelEntity', function() {
      HotelEntity.create = jest.fn(HotelEntity.create).mockReturnValue(hotelEntity);
      const result = HotelMapper.mapToDomain(hotelTableParams);
      expect(result).toEqual(hotelEntity);
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
      const result = HotelMapper.mapToDomain(hotelTableParams);
      expect(result).toHaveProperty(property);
    });
  });

  describe(`mapToTableParams`, () => {
    it('should return HotelOrmEntity', function() {
      const result = HotelMapper.mapToTableParams(hotelEntity);
      expect(result).toEqual(hotelTableParams);
    });

    it.each([
      `id`,
      `title`,
      `description`,
      `bedroom_count`,
      `max_adult_count`,
      `price`,
      `is_premium`,
      `rating`,
      `features`,
      `type`,
      `city`,
      `location`,
      `host`,
      `images`
    ])('should have %p property in result', function(property) {
      const result = HotelMapper.mapToTableParams(hotelEntity);
      expect(result).toHaveProperty(property);
    });
  });
});
