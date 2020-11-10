import { UserType } from '../user-type';
import { Image } from '../image';
import { IUser } from './user.interface';
import { User } from './user';


const userParams: IUser = {
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
};
describe(`User entity`, () => {
  describe(`constructor`, () => {
    let user: User;

    beforeAll( () => {
      user = new User(
        userParams.id,
        userParams.name,
        userParams.email,
        userParams.password,
        UserType.create(userParams.type),
        Image.create(userParams.image)
      );
    });

    it.each(
      [`type`, `image`]
    )(`should create a new User instance with %p property`, (property) => {
      expect(user).toHaveProperty(property);
    });

    it.each(
      [`id`, `name`, `email`, `password`]
    )(`should create a new User instance with correct %p property`, (property) => {
      expect(user[property]).toBe(userParams[property]);
    });
  });

  describe(`create method`, () => {
    let user: User;

    beforeAll( () => {
      user = User.create(userParams);
    });

    it.each(
      [`type`, `image`]
    )(`should create a new User instance with %p property`, (property) => {
      expect(user).toHaveProperty(property);
    });

    it.each(
      [`id`, `name`, `email`, `password`]
    )(`should create a new User instance with correct %p property`, (property) => {
      expect(user[property]).toBe(userParams[property]);
    });
  });
});
