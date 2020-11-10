import { Hotel } from '../hotel';
import { User } from '../user';
import { Favorite } from './favorite';
import { IFavorite } from './favorite.interface';


const favoriteParams: IFavorite = {
  value: true,
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

describe(`Favorite entity`, () => {
  describe(`constructor`, () => {
    let favorite: Favorite;

    beforeAll(() => {
      favorite = new Favorite(
        favoriteParams.value,
        User.create(favoriteParams.user),
        Hotel.create(favoriteParams.hotel)
      );
    });

    it.each([`hotel`, `user`])(`should create a new Favorite instance with correct %p property`, (property) => {
      expect(favorite).toHaveProperty(property);
    });

    it.each([`value`])(`should create a new Favorite instance with correct %p property`, (property) => {
      expect(favorite[property]).toBe(favoriteParams[property]);
    });
  });

  describe(`create method`, () => {
    let favorite: Favorite;

    beforeAll(() => {
      favorite = Favorite.create(favoriteParams);
    });

    it.each([`hotel`, `user`])(`should create a new Favorite instance with correct %p property`, (property) => {
      expect(favorite).toHaveProperty(property);
    });

    it.each([`value`])(`should create a new Favorite instance with correct %p property`, (property) => {
      expect(favorite[property]).toBe(favoriteParams[property]);
    });
  });
});
