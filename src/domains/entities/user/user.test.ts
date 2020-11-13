import { ImageEntity, UserTypeEntity } from 'domains/entities';
import { IUser } from './user.interface';
import { UserEntity } from './user.entity';


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
    let user: UserEntity;

    beforeAll( () => {
      user = new UserEntity(
        userParams.id,
        userParams.name,
        userParams.email,
        userParams.password,
        UserTypeEntity.create(userParams.type),
        ImageEntity.create(userParams.image)
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
    let user: UserEntity;

    beforeAll( () => {
      user = UserEntity.create(userParams);
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
