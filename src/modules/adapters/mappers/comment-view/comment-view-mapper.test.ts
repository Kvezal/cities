import {
  CommentEntity,
  HotelEntity,
  IComment,
  IHotel,
  IUser,
  UserEntity,
} from 'domains/entities';
import {
  CommentOrmEntity,
  HotelMapper,
  UserMapper,
} from 'modules/adapters';

import { CommentViewMapper } from './comment-view-mapper';



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
  host: userParams,
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

const commentParams: IComment = {
  id: `1`,
  text: `text`,
  createdAt: new Date(),
  rating: 4,
  user: userParams,
  hotel: hotelParams,
};

describe(`Comment View Mapper`, () => {
  const commentEntity: CommentEntity = CommentEntity.create(commentParams);
  const userEntity: UserEntity = UserEntity.create(commentParams.user);
  const hotelEntity: HotelEntity = HotelEntity.create(commentParams.hotel);
  const ormEntity = new CommentOrmEntity();
  ormEntity.id = commentParams.id;
  ormEntity.text = commentParams.text;
  ormEntity.createdAt = commentParams.createdAt;
  ormEntity.rating = commentParams.rating;
  ormEntity.user = UserMapper.mapToOrmEntity(userEntity);
  ormEntity.hotel = HotelMapper.mapToOrmEntity(hotelEntity);

  describe(`mapToDomain`, () => {
    it('should call create method of CommentEntity', function() {
      CommentEntity.create = jest.fn(CommentEntity.create);
      CommentViewMapper.mapToDomain(ormEntity);
      expect(CommentEntity.create).toHaveBeenCalledTimes(1);
    });

    it('should call create method of CommentEntity with params', function() {
      CommentEntity.create = jest.fn(CommentEntity.create);
      CommentViewMapper.mapToDomain(ormEntity);
      expect(CommentEntity.create).toHaveBeenCalledWith({
        ...commentParams,
        hotel: hotelEntity,
        user: userEntity,
      });
    });

    it('should return create method result of CommentEntity', function() {
      CommentEntity.create = jest.fn(CommentEntity.create).mockReturnValue(commentEntity);
      const result = CommentViewMapper.mapToDomain(ormEntity);
      expect(result).toEqual(commentEntity);
    });
  });

  describe(`mapToOrmEntity`, () => {
    it('should return CommentViewOrmEntity', function() {
      const result = CommentViewMapper.mapToOrmEntity(commentEntity);
      expect(result).toEqual(ormEntity);
    });

    it.each([
      `id`,
      `text`,
      `createdAt`,
      `rating`,
      `user`,
      `hotel`
    ])('should have %p property in result', function(property: string) {
      const result = CommentViewMapper.mapToOrmEntity(commentEntity);
      expect(result).toHaveProperty(property);
    });
  });
});
