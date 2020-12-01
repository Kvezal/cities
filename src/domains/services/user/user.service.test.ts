import { IUser, UserEntity } from 'domains/entities';

import { UserService } from './user.service';


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

describe(`User service`, () => {
  describe(`getUserById`, () => {
    it(`should call loadUserById method`, async () => {
      const loadUserById = jest.fn();
      const userService = new UserService(
        {loadUserById}
      );
      await userService.getUserById(userParams.id);
      expect(loadUserById).toHaveBeenCalledTimes(1);
    });

    it(`should call loadUserById method with params`, async () => {
      const loadUserById = jest.fn();
      const userService = new UserService(
        {loadUserById}
      );
      await userService.getUserById(userParams.id);
      expect(loadUserById).toHaveBeenCalledWith(userParams.id);
    });

    it(`should return result of loadUserById method`, async () => {
      const userEntity = UserEntity.create(userParams);
      const loadUserById = jest.fn().mockReturnValue(userEntity);
      const userService = new UserService(
        {loadUserById}
      );
      const result = await userService.getUserById(userParams.id);
      expect(result).toEqual(userEntity);
    });
  });
});
