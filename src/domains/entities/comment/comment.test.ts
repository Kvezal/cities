import { CommentEntity } from './comment.entity';
import { IComment } from './comment.interface';


const commentParams: IComment = {
  id: 1,
  text: `text`,
  date: new Date(),
  rating: 4,
  hotel: {
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
        id: 1,
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
  },
  user: {
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
};

describe(`Comment entity`, () => {
  describe(`constructor`, () => {
    let comment: CommentEntity;

    beforeAll(() => {
      comment = CommentEntity.create(commentParams);
    });

    it.each(
      [`hotel`, `user`, `rating`],
    )(`should create a new Comment instance with %p property`, (property) => {
      expect(comment).toHaveProperty(property);
    });

    it.each(
      [`id`, `text`, `date`],
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
      [`hotel`, `user`],
    )(`should create a new Comment instance with %p property`, (property) => {
      expect(comment).toHaveProperty(property);
    });

    it.each(
      [`id`, `text`, `date`],
    )(`should create a new Comment instance with correct %p property`, (property) => {
      expect(comment[property]).toBe(commentParams[property]);
    });
  });
});
