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
    it(`should call loadUserById method`, () => {
      const loadUserById = jest.fn();
      const userService = new UserService(
        {loadUserById},
        null
      );
      userService.getUserById(userParams.id);
      expect(loadUserById).toHaveBeenCalledTimes(1);
    });

    it(`should call loadUserById method with params`, () => {
      const loadUserById = jest.fn();
      const userService = new UserService(
        {loadUserById},
        null
      );
      userService.getUserById(userParams.id);
      expect(loadUserById).toHaveBeenCalledWith(userParams.id);
    });

    it(`should return result of loadUserById method`, () => {
      const userEntity = UserEntity.create(userParams);
      const loadUserById = jest.fn().mockReturnValue(userEntity);
      const userService = new UserService(
        {loadUserById},
        null
      );
      const result = userService.getUserById(userParams.id);
      expect(result).toEqual(userEntity);
    });
  });

  describe(`createUser`, () => {
    it(`should call createUser method`, () => {
      const createUser = jest.fn();
      const userService = new UserService(
        null,
        {createUser}
      );
      userService.createUser(userParams);
      expect(createUser).toHaveBeenCalledTimes(1);
    });

    it(`should call create method of User`, () => {
      const staticCreate = jest.fn();
      UserEntity.create = staticCreate;

      const userService = new UserService(
        null,
        {createUser: () => null}
      );
      userService.createUser(userParams);
      expect(staticCreate).toHaveBeenCalledTimes(1);
    });

    it(`should call create method of User with params`, () => {
      const staticCreate = jest.fn();
      UserEntity.create = staticCreate;

      const userService = new UserService(
        null,
        {createUser: () => null}
      );
      userService.createUser(userParams);
      expect(staticCreate).toHaveBeenCalledWith(userParams);
    });

    it(`should call createUser method with params`, () => {
      const userEntity = UserEntity.create(userParams);
      const createUser = jest.fn();
      UserEntity.create = jest.fn().mockReturnValue(userEntity);

      const userService = new UserService(
        null,
        {createUser}
      );
      userService.createUser(userParams);
      expect(createUser).toHaveBeenCalledWith(userEntity);
    });

    it(`should return result of createUser method`, () => {
      const userEntity = UserEntity.create(userParams);
      const createUser = jest.fn().mockReturnValue(userEntity);

      const userService = new UserService(
        null,
        {createUser}
      );
      const result = userService.createUser(userParams);
      expect(result).toEqual(userEntity);
    });
  });
});
