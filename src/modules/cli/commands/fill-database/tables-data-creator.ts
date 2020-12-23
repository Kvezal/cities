import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {
  getRandomEmail,
  getRandomInt,
  getRandomString,
  shuffle
} from '../../../utils';


export class TablesDataCreator {
  constructor(
    private readonly _features,
    private readonly _citiesData,
    private readonly _hotelsData,
    private readonly _usersData,
  ) {
  }

  static async getData(
    count,
    features,
    citiesData,
    hotelsData,
    usersData,
  ) {
    const tablesDataCreator = new TablesDataCreator(
      features,
      citiesData,
      hotelsData,
      usersData,
    );
    const users = await tablesDataCreator.generateUsers(count);
    const hotels = tablesDataCreator.generateHotels(count, users);
    const comments = tablesDataCreator.generateComments(users, hotels);
    const favorites = tablesDataCreator.generateFavorites(users, hotels);
    return {
      users,
      hotels,
      comments,
      favorites,
    };
  }

  public async generateUsers(count: number) {
    const { types, images } = this._usersData;
    const password: string = await hash(getRandomString(6), 10);
    return Array(count)
      .fill(``)
      .map<any>(() => {
        const email = getRandomEmail(15, [`ru`, `com`]);
        return {
          id: uuidv4(),
          password,
          email: getRandomEmail(15, [`ru`, `com`]),
          name: email.split(`@`)[0],
          type: {
            title: types[getRandomInt(0, types.length - 1)],
          },
          image: this._generateImage(
            images[getRandomInt(0, images.length - 1)],
          ),
        };
      });
  }

  public generateHotels(count: number, users) {
    const { images, titles, descriptions, types } = this._hotelsData;
    return Array(count)
      .fill(``)
      .map(() => {
        const city = this._citiesData[
          getRandomInt(0, this._citiesData.length - 1)
        ];
        return {
          id: uuidv4(),
          title: titles[getRandomInt(0, titles.length - 1)],
          description: descriptions[getRandomInt(0, descriptions.length - 1)],
          bedroomCount: getRandomInt(1, 3),
          maxAdultCount: getRandomInt(1, 8),
          price: getRandomInt(50, 2000),
          isPremium: Math.random() > 0.5,
          type: {
            title: types[getRandomInt(0, types.length - 1)],
          },
          city: {
            title: city.name,
          },
          host: {
            id: users[getRandomInt(0, users.length - 1)].id,
          },
          images: shuffle(images)
            .slice(0, getRandomInt(1, 10))
            .map((title: string) => this._generateImage(title)),
          features: shuffle(this._features).slice(
            0,
            getRandomInt(0, this._features.length - 1),
          ),
          location: this._generateLocation(city),
        };
      });
  }

  public generateComments(users, hotels) {
    return hotels.reduce((comments, hotel) => {
      const hotelComments = shuffle(users)
        .slice(0, getRandomInt(0, users.length - 1))
        .map((user: any) => ({
          id: uuidv4(),
          userId: user.id,
          hotelId: hotel.id,
          text: shuffle(this._usersData.comments)
            .slice(0, getRandomInt(0, this._usersData.comments.length - 1))
            .join(` `),
          rating: getRandomInt(1, 5),
        }));
      comments.push(...hotelComments);
      return comments;
    }, []);
  }

  public generateFavorites(users, hotels) {
    return users.reduce((favorites, user) => {
      const userFavorites = shuffle(hotels)
        .slice(0, getRandomInt(0, hotels.length - 1))
        .map((hotel: any) => ({
          userId: user.id,
          hotelId: hotel.id,
        }));
      favorites.push(...userFavorites);
      return favorites;
    }, []);
  }

  private _generateImage(title) {
    return {
      id: uuidv4(),
      title,
    };
  }

  private _generateLocation(city) {
    return {
      id: uuidv4(),
      latitude:
        getRandomInt(city.from.latitude * 100000, city.to.latitude * 100000) /
        100000,
      longitude:
        getRandomInt(city.from.longitude * 100000, city.to.longitude * 100000) /
        100000,
      zoom: 10,
    };
  }
}
