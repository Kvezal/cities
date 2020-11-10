import { Hotel } from '../hotel';
import { User } from '../user';
import { IRating } from './rating.interface';
import { Rating } from './rating';


const ratingParams: IRating = {
  value: 4,
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
  },
};

describe(`Rating entity`, () => {
  describe(`constructor`, () => {
    let rating: IRating;

    beforeAll(() => {
      rating = new Rating(
        ratingParams.value,
        User.create(ratingParams.user),
        Hotel.create(ratingParams.hotel)
      );
    });
    it.each([`hotel`, `user`])(`should create a new Rating instance with correct %p property`, (property) => {
      expect(rating).toHaveProperty(property);
    });

    it.each([`value`])(`should create a new Rating instance with correct %p property`, (property) => {
      expect(rating[property]).toBe(ratingParams[property]);
    });
  });

  describe(`create method`, () => {
    let rating: IRating;

    beforeAll(() => {
      rating = Rating.create(ratingParams);
    });


    it.each([`hotel`, `user`])(`should create a new Rating instance with correct %p property`, (property) => {
      expect(rating).toHaveProperty(property);
    });

    it.each([`value`])(`should create a new Rating instance with correct %p property`, (property) => {
      expect(rating[property]).toBe(ratingParams[property]);
    });
  });
});
