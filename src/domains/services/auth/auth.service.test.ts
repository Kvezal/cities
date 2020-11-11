import { IUserAuthenticate } from '../../interfaces';
import { AuthService } from './auth.service';
import { IUser, UserEntity } from '../../entities/user';
import { IJsonWebTokenParams, JsonWebTokenEntity } from '../../entities/json-web-token';


describe(`Auth service`, () => {
  const authenticateParam: IUserAuthenticate = {
    email: `email@gmail.com`,
    password: `password`,
  };

  const jsonWebTokenEntityParams: IJsonWebTokenParams = {
    id: 1,
    name: `name`,
    email: `email@gmail.com`,
    image: {
      id: 1,
      title: `title`,
    },
  };

  const userEntityParams: IUser = {
    ...jsonWebTokenEntityParams,
    password: `password`,
    type: {
      id: 1,
      title: `title`,
    },
  };

  describe(`authenticate method`, () => {
    it(`should call loadUserByEmail method`, () => {
      const loadUserByEmail = jest.fn();
      const authService = new AuthService(
        {loadUserByEmail},
        null
      );
      authService.authenticateUser(authenticateParam);
      expect(loadUserByEmail).toHaveBeenCalledTimes(1);
    });

    it(`should call generate method of JsonWebTokenEntity`, () => {
      const userEntity = UserEntity.create(userEntityParams);
      const loadUserByEmail = jest.fn().mockReturnValue(userEntity);
      JsonWebTokenEntity.generate = jest.fn();
      const authService = new AuthService(
        {loadUserByEmail},
        {saveJsonWebToken: () => null}
      );
      authService.authenticateUser(authenticateParam);
      expect(JsonWebTokenEntity.generate).toHaveBeenCalledTimes(1);
    });

    it(`should call saveJsonWebToken method`, () => {
      const userEntity = UserEntity.create(userEntityParams);
      const loadUserByEmail = jest.fn().mockReturnValue(userEntity);
      const saveJsonWebToken = jest.fn();
      const authService = new AuthService(
        {loadUserByEmail},
        {saveJsonWebToken}
      );
      authService.authenticateUser(authenticateParam);
      expect(saveJsonWebToken).toHaveBeenCalledTimes(1);
    });

    it(`should return result of saveJsonWebToken method`, () => {
      const userEntity = UserEntity.create(userEntityParams);
      const jsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenEntityParams);
      const loadUserByEmail = jest.fn().mockReturnValue(userEntity);
      const saveJsonWebToken = jest.fn().mockReturnValue(jsonWebTokenEntity);

      const authService = new AuthService(
        {loadUserByEmail},
        {saveJsonWebToken}
      );
      const result = authService.authenticateUser(authenticateParam);
      expect(result).toEqual(jsonWebTokenEntity);
    });
  });
});
