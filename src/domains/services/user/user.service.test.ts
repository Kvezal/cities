import { IUser, UserEntity } from '../../entities/user';
import { UserService } from './user.service';


describe(`User service`, () => {
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

  describe(`getUserById`, () => {
    it(`should call loadUserById method`, async () => {
      const loadUserById = jest.fn();
      const userService = new UserService(
        {loadUserById},
        null
      );
      await userService.getUserById(userParams.id);
      expect(loadUserById).toHaveBeenCalledTimes(1);
    });

    it(`should call loadUserById method with params`, async () => {
      const loadUserById = jest.fn();
      const userService = new UserService(
        {loadUserById},
        null
      );
      await userService.getUserById(userParams.id);
      expect(loadUserById).toHaveBeenCalledWith(userParams.id);
    });

    it(`should return result of loadUserById method`, async () => {
      const userEntity = UserEntity.create(userParams);
      const loadUserById = jest.fn().mockReturnValue(userEntity);
      const userService = new UserService(
        {loadUserById},
        null
      );
      const result = await userService.getUserById(userParams.id);
      expect(result).toEqual(userEntity);
    });
  });

  describe(`createUser`, () => {
    it(`should call createUser method`, async () => {
      const createUser = jest.fn();
      const userService = new UserService(
        null,
        {createUser}
      );
      await userService.createUser(userParams);
      expect(createUser).toHaveBeenCalledTimes(1);
    });

    it(`should call create method of User`, async () => {
      const staticCreate = jest.fn();
      UserEntity.create = staticCreate;

      const userService = new UserService(
        null,
        {createUser: () => null}
      );
      await userService.createUser(userParams);
      expect(staticCreate).toHaveBeenCalledTimes(1);
    });

    it(`should call create method of User with params`, async () => {
      const staticCreate = jest.fn();
      UserEntity.create = staticCreate;

      const userService = new UserService(
        null,
        {createUser: () => null}
      );
      await userService.createUser(userParams);
      expect(staticCreate).toHaveBeenCalledWith(userParams);
    });

    it(`should call createUser method with params`, async () => {
      const userEntity = UserEntity.create(userParams);
      const createUser = jest.fn();
      UserEntity.create = jest.fn().mockReturnValue(userEntity);

      const userService = new UserService(
        null,
        {createUser}
      );
      await userService.createUser(userParams);
      expect(createUser).toHaveBeenCalledWith(userEntity);
    });

    it(`should return result of createUser method`, async () => {
      const userEntity = UserEntity.create(userParams);
      const createUser = jest.fn().mockReturnValue(userEntity);

      const userService = new UserService(
        null,
        {createUser}
      );
      const result = await userService.createUser(userParams);
      expect(result).toEqual(userEntity);
    });
  });
});
