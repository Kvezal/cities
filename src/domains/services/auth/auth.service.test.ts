import { hash } from 'bcrypt';

import { SALT_ROUND } from '../../constants';
import { IJsonWebTokenParams, IUser, JsonWebTokenEntity, UserEntity } from '../../entities';
import { IUserAuthenticate } from '../../interfaces';
import { AuthService } from './auth.service';


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
    it(`should call loadUserByEmail method`, async () => {
      const loadUserByEmail = jest.fn();
      const authService = new AuthService(
        {loadUserByEmail},
        null,
        null,
        null
      );
      await authService.authenticateUser(authenticateParam);
      expect(loadUserByEmail).toHaveBeenCalledTimes(1);
    });

    it(`should call generate method of JsonWebTokenEntity`, async () => {
      const password = await hash(userEntityParams.password, SALT_ROUND);
      const newUserEntityParams = {
        ...userEntityParams,
        password,
      };
      const userEntity = UserEntity.create(newUserEntityParams);
      JsonWebTokenEntity.generate = jest.fn(JsonWebTokenEntity.generate);
      const authService = new AuthService(
        {loadUserByEmail: jest.fn().mockReturnValue(userEntity)},
        {saveJsonWebToken: () => null},
        null,
        null
      );
      await authService.authenticateUser(authenticateParam);
      expect(JsonWebTokenEntity.generate).toHaveBeenCalledTimes(1);
    });

    it(`should call saveJsonWebToken method`, async () => {
      const password = await hash(userEntityParams.password, SALT_ROUND);
      const newUserEntityParams = {
        ...userEntityParams,
        password,
      };
      const userEntity = UserEntity.create(newUserEntityParams);
      const saveJsonWebToken = jest.fn();
      const authService = new AuthService(
        {loadUserByEmail: jest.fn().mockReturnValue(userEntity)},
        {saveJsonWebToken},
        null,
        null
      );
      await authService.authenticateUser(authenticateParam);
      expect(saveJsonWebToken).toHaveBeenCalledTimes(1);
    });

    it(`should return result of saveJsonWebToken method`, async () => {
      const password = await hash(userEntityParams.password, SALT_ROUND);
      const newUserEntityParams = {
        ...userEntityParams,
        password,
      };
      const userEntity = UserEntity.create(newUserEntityParams);
      const jsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenEntityParams);

      const authService = new AuthService(
        {loadUserByEmail: jest.fn().mockReturnValue(userEntity)},
        {saveJsonWebToken: jest.fn().mockReturnValue(jsonWebTokenEntity)},
        null,
        null
      );
      const result = await authService.authenticateUser(authenticateParam);
      expect(result).toEqual(jsonWebTokenEntity);
    });
  });

  describe(`checkAccessToken`, () => {
    const jsonWebTokenEntity: JsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenEntityParams);
    let authService: AuthService;

    beforeAll(async () => {
      authService = new AuthService(
        null,
        null,
        null,
        null
      );
    });

    it(`should call checkAccessToken of JsonWebTokenEntity`, async () => {
      jsonWebTokenEntity.checkAccessToken = jest.fn();
      await authService.checkAccessToken(jsonWebTokenEntity);
      expect(jsonWebTokenEntity.checkAccessToken).toHaveBeenCalledTimes(1);
    });

    it(`should return result of JsonWebTokenEntity.checkAccessToken`, async () => {
      const resultOfCheckAccessToken = true;
      jsonWebTokenEntity.checkAccessToken = jest.fn().mockReturnValue(resultOfCheckAccessToken);
      const result = await authService.checkAccessToken(jsonWebTokenEntity);
      expect(result).toBe(resultOfCheckAccessToken);
    });
  });

  describe(`decodeAccessToken method`, () => {
    const jsonWebTokenEntity: JsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenEntityParams);
    let authService: AuthService;

    beforeAll(async () => {
      authService = new AuthService(
        null,
        null,
        null,
        null
      );
    });

    it(`should call decodeAccessToken of JsonWebTokenEntity`, async () => {
      jsonWebTokenEntity.decodeAccessToken = jest.fn();
      await authService.decodeAccessToken(jsonWebTokenEntity);
      expect(jsonWebTokenEntity.decodeAccessToken).toHaveBeenCalledTimes(1);
    });

    it(`should return result of JsonWebTokenEntity.decodeAccessToken`, async () => {
      jsonWebTokenEntity.decodeAccessToken = jest.fn().mockReturnValue(jsonWebTokenEntityParams);
      const result = await authService.decodeAccessToken(jsonWebTokenEntity);
      expect(result).toEqual(jsonWebTokenEntityParams);
    });
  });

  describe(`refreshToken method`, () => {
    const jsonWebTokenEntity: JsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenEntityParams);

    it(`should call decodeAccessToken method`, async () => {
      jsonWebTokenEntity.checkRefreshToken = jest.fn(jsonWebTokenEntity.checkRefreshToken);
      const loadJsonWebToken = jest.fn();
      const authService = new AuthService(
        null,
        null,
        {loadJsonWebToken},
        null
      );
      await authService.refreshToken(jsonWebTokenEntity);
      expect(jsonWebTokenEntity.checkRefreshToken).toHaveBeenCalledTimes(1);
    });

    it(`should call loadJsonWebToken method`, async () => {
      const loadJsonWebToken = jest.fn();
      const authService = new AuthService(
        null,
        null,
        {loadJsonWebToken},
        null
      );
      await authService.refreshToken(jsonWebTokenEntity);
      expect(loadJsonWebToken).toHaveBeenCalledTimes(1);
    });

    it(`loadJsonWebToken method should be called with refresh token`, async () => {
      const loadJsonWebToken = jest.fn();
      const authService = new AuthService(
        null,
        null,
        {loadJsonWebToken},
        null
      );
      await authService.refreshToken(jsonWebTokenEntity);
      expect(loadJsonWebToken).toHaveBeenCalledWith(jsonWebTokenEntity.refreshToken);
    });

    it(`should call deleteJsonWebToken method`, async () => {
      const deleteJsonWebToken = jest.fn();
      const authService = new AuthService(
        null,
        {saveJsonWebToken: jest.fn()},
        {loadJsonWebToken: jest.fn().mockReturnValue(jsonWebTokenEntity)},
        {deleteJsonWebToken}
      );
      await authService.refreshToken(jsonWebTokenEntity);
      expect(deleteJsonWebToken).toHaveBeenCalledTimes(1);
    });

    it(`deleteJsonWebToken method should be called with refresh token`, async () => {
      const deleteJsonWebToken = jest.fn();
      const authService = new AuthService(
        null,
        {saveJsonWebToken: jest.fn()},
        {loadJsonWebToken: jest.fn().mockReturnValue(jsonWebTokenEntity)},
        {deleteJsonWebToken}
      );
      await authService.refreshToken(jsonWebTokenEntity);
      expect(deleteJsonWebToken).toHaveBeenCalledWith(jsonWebTokenEntity.refreshToken);
    });

    it(`should call saveJsonWebToken method`, async () => {
      const saveJsonWebToken = jest.fn();
      const authService = new AuthService(
        null,
        {saveJsonWebToken},
        {loadJsonWebToken: jest.fn().mockReturnValue(jsonWebTokenEntity)},
        {deleteJsonWebToken: jest.fn()}
      );
      await authService.refreshToken(jsonWebTokenEntity);
      expect(saveJsonWebToken).toHaveBeenCalledTimes(1);
    });

    it(`saveJsonWebToken method should be called with refresh token`, async () => {
      jsonWebTokenEntity.refresh = jest.fn().mockReturnValue(jsonWebTokenEntity);
      const saveJsonWebToken = jest.fn();
      const authService = new AuthService(
        null,
        {saveJsonWebToken},
        {loadJsonWebToken: jest.fn().mockReturnValue(jsonWebTokenEntity)},
        {deleteJsonWebToken: jest.fn()}
      );
      await authService.refreshToken(jsonWebTokenEntity);
      expect(saveJsonWebToken).toHaveBeenCalledWith(jsonWebTokenEntity);
    });
  });
});
