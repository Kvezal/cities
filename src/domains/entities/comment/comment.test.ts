import { CommentEntity } from './comment.entity';
import { IComment } from './comment.interface';
import {
  IHotel,
  IUser,
} from 'domains/entities';


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

const commentParams: IComment = {
  id: `1`,
  text: `text`,
  createdAt: new Date(),
  hotel: hotelParams,
  user: userParams,
  rating: 4,
};

describe(`Comment entity`, () => {
  describe(`constructor`, () => {
    let comment: CommentEntity;

    beforeAll(() => {
      comment = CommentEntity.create(commentParams);
    });

    it.each([`hotel`, `user`])(`should create a new Comment instance with %p property`, (property: string) => {
      expect(comment).toHaveProperty(property);
    })

    it.each(
      [`id`, `text`, `date`, `rating`],
    )(`should create a new Comment instance with correct %p property`, (property) => {
      expect(comment[property]).toBe(commentParams[property]);
    });
  });

  describe(`create method`, () => {
    let comment: CommentEntity;

    beforeAll(() => {
      comment = CommentEntity.create(commentParams);
    });

    it.each(
      [`id`, `text`, `date`, `hotelId`, `userId`],
    )(`should create a new Comment instance with correct %p property`, (property) => {
      expect(comment[property]).toBe(commentParams[property]);
    });
  });
});
