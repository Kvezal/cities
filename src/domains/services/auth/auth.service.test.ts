import { hash } from 'bcrypt';

import { SALT_ROUND } from 'domains/constants';
import {
  IJsonWebTokenParams,
  IUser,
  IUserType,
  JsonWebTokenEntity,
  UserEntity,
  UserTypeEntity,
} from 'domains/entities';
import { IUserAuthenticate } from 'domains/interfaces';

import { AuthService } from './auth.service';


const authenticateParam: IUserAuthenticate = {
  email: `email@gmail.com`,
  password: `password`,
};

const userTypeParams: IUserType = {
  id: `1`,
  title: `title`,
};

const userEntityParams: IUser = {
  id: `1`,
  name: `name`,
  email: `email@gmail.com`,
  password: `password`,
  type: userTypeParams,
  image: {
    id: `1`,
    title: `image`,
  },
};

const jsonWebTokenEntityParams: IJsonWebTokenParams = {
  id: userEntityParams.id,
  name: userEntityParams.name,
  email: userEntityParams.email,
  image: userEntityParams.image.title,
};

describe(`Auth service`, () => {
  let password: string;
  let userParams: IUser;
  let userEntity: UserEntity;

  beforeAll(async () => {
    password = await hash(userEntityParams.password, SALT_ROUND);
    userParams = {
      ...userEntityParams,
      password
    };
    userEntity = UserEntity.create(userParams);
  });

  describe(`authenticate method`, () => {
    describe(`loadUserByEmail method`, () => {
      it(`should call`, async () => {
        const loadUserByEmail = jest.fn().mockResolvedValueOnce(userEntity);
        const authService = new AuthService(
          {loadUserByEmail},
          null,
          null,
          {saveJsonWebToken: async () => null},
          null,
          null
        );
        await authService.authenticateUser(authenticateParam);
        expect(loadUserByEmail).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const loadUserByEmail = jest.fn().mockResolvedValueOnce(userEntity);
        const authService = new AuthService(
          {loadUserByEmail},
          null,
          null,
          {saveJsonWebToken: async () => null},
          null,
          null
        );
        await authService.authenticateUser(authenticateParam);
        expect(loadUserByEmail).toHaveBeenCalledWith(authenticateParam.email);
      });

      describe(`if user isn't existed`, () => {
        it(`should call getUserParams`, async () => {
          const authService = new AuthService(
            {loadUserByEmail: async () => null},
            {saveUser: async () => userEntity},
            {loadUserTypeByTitle: async () => UserTypeEntity.create(userTypeParams)},
            {saveJsonWebToken: () => null},
            null,
            null
          );
          const getUserParams = jest.spyOn(authService, `getUserParams`).mockImplementationOnce(async () => userParams);
          await authService.authenticateUser(authenticateParam);
          await expect(getUserParams).toHaveBeenCalledTimes(1);
        });

        it(`should call getUserParams with params`, async () => {
          const authService = new AuthService(
            {loadUserByEmail: async () => null},
            {saveUser: async () => userEntity},
            {loadUserTypeByTitle: async () => UserTypeEntity.create(userTypeParams)},
            {saveJsonWebToken: () => null},
            null,
            null
          );
          const getUserParams = jest.spyOn(authService, `getUserParams`).mockImplementationOnce(async () => userParams);
          await authService.authenticateUser(authenticateParam);
          await expect(getUserParams).toHaveBeenCalledWith(authenticateParam);
        });

        it(`should call saveUser`, async () => {
          const saveUser = jest.fn().mockResolvedValueOnce(userEntity);
          const authService = new AuthService(
            {loadUserByEmail: async () => null},
            {saveUser},
            {loadUserTypeByTitle: async () => UserTypeEntity.create(userTypeParams)},
            {saveJsonWebToken: () => null},
            null,
            null
          );
          jest.spyOn(authService, `getUserParams`).mockImplementationOnce(async () => userParams);
          await authService.authenticateUser(authenticateParam);
          await expect(saveUser).toHaveBeenCalledTimes(1);
        });

        it(`should call saveUser with params`, async () => {
          const saveUser = jest.fn().mockResolvedValueOnce(userEntity);
          const authService = new AuthService(
            {loadUserByEmail: async () => null},
            {saveUser},
            {loadUserTypeByTitle: async () => UserTypeEntity.create(userTypeParams)},
            {saveJsonWebToken: () => null},
            null,
            null
          );
          jest.spyOn(authService, `getUserParams`).mockImplementationOnce(async () => userParams);
          await authService.authenticateUser(authenticateParam);
          await expect(saveUser).toHaveBeenCalledWith(userEntity);
        });
      });
    });

    describe(`generate method of JsonWebTokenEntity`, () => {
      it(`should call`, async () => {
        JsonWebTokenEntity.generate = jest.fn(JsonWebTokenEntity.generate);
        const authService = new AuthService(
          {loadUserByEmail: jest.fn().mockReturnValue(userEntity)},
          null,
          null,
          {saveJsonWebToken: () => null},
          null,
          null
        );
        await authService.authenticateUser(authenticateParam);
        expect(JsonWebTokenEntity.generate).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        JsonWebTokenEntity.generate = jest.fn(JsonWebTokenEntity.generate);
        const authService = new AuthService(
          {loadUserByEmail: jest.fn().mockReturnValue(userEntity)},
          null,
          null,
          {saveJsonWebToken: () => null},
          null,
          null
        );
        await authService.authenticateUser(authenticateParam);
        expect(JsonWebTokenEntity.generate).toHaveBeenCalledWith({
          id: userEntity.id,
          name: userEntity.name,
          email: userEntity.email,
          image: userEntity.image.title,
        });
      });
    });

    describe(`saveJsonWebToken method of JsonWebTokenSaverService`, () => {
      it(`should call`, async () => {
        const saveJsonWebToken = jest.fn();
        const authService = new AuthService(
          {loadUserByEmail: jest.fn().mockReturnValue(userEntity)},
          null,
          null,
          {saveJsonWebToken},
          null,
          null
        );
        await authService.authenticateUser(authenticateParam);
        expect(saveJsonWebToken).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const saveJsonWebToken = jest.fn();
        const jsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenEntityParams);
        JsonWebTokenEntity.generate = jest.fn(JsonWebTokenEntity.generate).mockReturnValueOnce(jsonWebTokenEntity);
        const authService = new AuthService(
          {loadUserByEmail: jest.fn().mockReturnValue(userEntity)},
          null,
          null,
          {saveJsonWebToken},
          null,
          null
        );
        await authService.authenticateUser(authenticateParam);
        expect(saveJsonWebToken).toHaveBeenCalledWith(jsonWebTokenEntity.refreshToken);
      });
    });

    it(`should return result of saveJsonWebToken method`, async () => {
      const jsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenEntityParams);
      JsonWebTokenEntity.generate = jest.fn(JsonWebTokenEntity.generate).mockReturnValueOnce(jsonWebTokenEntity);
      const authService = new AuthService(
        {loadUserByEmail: async () => userEntity},
        null,
        null,
        {saveJsonWebToken: async () => null},
        null,
        null
      );
      const result = await authService.authenticateUser(authenticateParam);
      expect(result).toEqual(jsonWebTokenEntity);
    });
  });

  describe(`signUp method`, () => {
    describe(`create method of UserEntity`, () => {
      it(`should call`, async () => {
        UserEntity.create = jest.fn(UserEntity.create);
        const authService = new AuthService(
          {loadUserByEmail: async () => userEntity},
          {saveUser: async () => null},
          null,
          {saveJsonWebToken: async () => null},
          null,
          null
        );
        await authService.signUp(userEntityParams);
        expect(UserEntity.create).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        UserEntity.create = jest.fn(UserEntity.create);
        const authService = new AuthService(
          {loadUserByEmail: async () => userEntity},
          {saveUser: async () => null},
          null,
          {saveJsonWebToken: async () => null},
          null,
          null
        );
        await authService.signUp(userEntityParams);
        expect(UserEntity.create).toHaveBeenCalledWith(userEntityParams);
      });
    });

    describe(`saveUser method of UserSaverService`, () => {
      it(`should call`, async () => {
        const saveUser = jest.fn();
        UserEntity.create = jest.fn(UserEntity.create).mockReturnValue(userEntity);
        const authService = new AuthService(
          {loadUserByEmail: async () => userEntity},
          {saveUser},
          null,
          {saveJsonWebToken: async () => null},
          null,
          null
        );
        await authService.signUp(userEntityParams);
        expect(saveUser).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const saveUser = jest.fn();
        UserEntity.create = jest.fn(UserEntity.create).mockReturnValue(userEntity);
        const authService = new AuthService(
          {loadUserByEmail: async () => userEntity},
          {saveUser},
          null,
          {saveJsonWebToken: async () => null},
          null,
          null
        );
        await authService.signUp(userEntityParams);
        expect(saveUser).toHaveBeenCalledWith(userEntity);
      });
    });

    it(`should return result of saveUser method`, async () => {
      const saveUser = jest.fn().mockResolvedValueOnce(userEntity);
      const authService = new AuthService(
        {loadUserByEmail: async () => userEntity},
        {saveUser},
        null,
        {saveJsonWebToken: async () => null},
        null,
        null
      );
      const result = await authService.signUp(userEntityParams);
      expect(result).toEqual(userEntity);
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
        null,
        null,
        null
      );
    });

    describe(`checkAccessToken of JsonWebTokenEntity`, () => {
      it(`should call`, async () => {
        JsonWebTokenEntity.checkAccessToken = jest.fn(JsonWebTokenEntity.checkAccessToken);
        await authService.checkAccessToken(jsonWebTokenEntity.accessToken);
        expect(JsonWebTokenEntity.checkAccessToken).toHaveBeenCalledTimes(1);
      });

      it(`should call without params`, async () => {
        JsonWebTokenEntity.checkAccessToken = jest.fn(JsonWebTokenEntity.checkAccessToken);
        await authService.checkAccessToken(jsonWebTokenEntity.accessToken);
        expect(JsonWebTokenEntity.checkAccessToken).toHaveBeenCalledWith(jsonWebTokenEntity.accessToken);
      });
    });

    it(`should return result of JsonWebTokenEntity.checkAccessToken`, async () => {
      const resultOfCheckAccessToken = true;
      JsonWebTokenEntity.checkAccessToken = jest.fn().mockReturnValue(resultOfCheckAccessToken);
      const result = await JsonWebTokenEntity.checkAccessToken(jsonWebTokenEntity.accessToken);
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
        null,
        null,
        null
      );
    });

    describe(`decodeAccessToken of JsonWebTokenEntity`, () => {
      it(`should call`, async () => {
        JsonWebTokenEntity.decodeAccessToken = jest.fn(JsonWebTokenEntity.decodeAccessToken);
        await authService.decodeAccessToken(jsonWebTokenEntity.accessToken);
        expect(JsonWebTokenEntity.decodeAccessToken).toHaveBeenCalledTimes(1);
      });

      it(`should call without params`, async () => {
        JsonWebTokenEntity.decodeAccessToken = jest.fn(JsonWebTokenEntity.decodeAccessToken);
        await authService.decodeAccessToken(jsonWebTokenEntity.accessToken);
        expect(JsonWebTokenEntity.decodeAccessToken).toHaveBeenCalledWith(jsonWebTokenEntity.accessToken);
      });
    });

    it(`should return result of JsonWebTokenEntity.decodeAccessToken`, async () => {
      JsonWebTokenEntity.decodeAccessToken = jest.fn(JsonWebTokenEntity.decodeAccessToken).mockResolvedValueOnce(jsonWebTokenEntityParams);
      const result = await authService.decodeAccessToken(jsonWebTokenEntity.accessToken);
      expect(result).toEqual(jsonWebTokenEntityParams);
    });
  });

  describe(`refreshToken method`, () => {
    const jsonWebTokenEntity: JsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenEntityParams);

    describe(`logout method of Auth service`, () => {
      it(`should call`, async () => {
        const authService = new AuthService(
          null,
          null,
          null,
          null,
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        const logout = jest.spyOn(authService, `logout`)
        await authService.logout(jsonWebTokenEntity.refreshToken);
        expect(logout).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const authService = new AuthService(
          null,
          null,
          null,
          null,
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        const logout = jest.spyOn(authService, `logout`)
        await authService.logout(jsonWebTokenEntity.refreshToken);
        expect(logout).toHaveBeenCalledWith(jsonWebTokenEntity.refreshToken);
      });
    })

    describe(`refresh method of JsonWebTokenEntity`, () => {
      it(`should call`, async () => {
        JsonWebTokenEntity.refresh = jest.fn(JsonWebTokenEntity.refresh);
        const authService = new AuthService(
          null,
          null,
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        await authService.refreshToken(jsonWebTokenEntity.refreshToken);
        expect(JsonWebTokenEntity.refresh).toHaveBeenCalledTimes(1);
      });

      it(`should call without params`, async () => {
        JsonWebTokenEntity.refresh = jest.fn(JsonWebTokenEntity.refresh);
        const authService = new AuthService(
          null,
          null,
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        await authService.refreshToken(jsonWebTokenEntity.refreshToken);
        expect(JsonWebTokenEntity.refresh).toHaveBeenCalledWith(jsonWebTokenEntity.refreshToken);
      });
    });

    describe(`saveJsonWebToken method of JsonWebTokenSaverService`, () => {
      it(`should call`, async () => {
        const saveJsonWebToken = jest.fn();
        const authService = new AuthService(
          null,
          null,
          null,
          {saveJsonWebToken},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        await authService.refreshToken(jsonWebTokenEntity.refreshToken);
        expect(saveJsonWebToken).toHaveBeenCalledTimes(1);
      });

      it(`should be called with params`, async () => {
        JsonWebTokenEntity.refresh = jest.fn().mockReturnValue(jsonWebTokenEntity);
        const saveJsonWebToken = jest.fn();
        const authService = new AuthService(
          null,
          null,
          null,
          {saveJsonWebToken},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        await authService.refreshToken(jsonWebTokenEntity.refreshToken);
        expect(saveJsonWebToken).toHaveBeenCalledWith(jsonWebTokenEntity.refreshToken);
      });
    });
  });

  describe(`logout method`, () => {
    const jsonWebTokenEntity: JsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenEntityParams);

    describe(`checkRefreshToken method of JsonWebTokenEntity`, () => {
      it(`should call`, async () => {
        JsonWebTokenEntity.checkRefreshToken = jest.fn(JsonWebTokenEntity.checkRefreshToken);
        const authService = new AuthService(
          null,
          null,
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        await authService.logout(jsonWebTokenEntity.refreshToken);
        expect(JsonWebTokenEntity.checkRefreshToken).toHaveBeenCalledTimes(1);
      });

      it(`should call without params`, async () => {
        JsonWebTokenEntity.checkRefreshToken = jest.fn(JsonWebTokenEntity.checkRefreshToken);
        const authService = new AuthService(
          null,
          null,
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        await authService.logout(jsonWebTokenEntity.refreshToken);
        expect(JsonWebTokenEntity.checkRefreshToken).toHaveBeenCalledWith(jsonWebTokenEntity.refreshToken);
      });

      it(`should throw error if token is invalid`, async () => {
        JsonWebTokenEntity.checkRefreshToken = jest.fn(JsonWebTokenEntity.checkRefreshToken)
          .mockResolvedValueOnce(false);
        const authService = new AuthService(
          null,
          null,
          null,
          null,
          null,
          null
        );
        await expect(authService.logout(jsonWebTokenEntity.refreshToken)).rejects
          .toThrow(new Error(`JSON Web Token is invalid`));
      });
    });

    describe(`checkExistedJsonWebToken method of JsonWebTokenCheckerService`, () => {
      it(`should call`, async () => {
        const checkExistedJsonWebToken = jest.fn().mockResolvedValueOnce(true);
        const authService = new AuthService(
          null,
          null,
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken},
          {deleteJsonWebToken: async () => null}
        );
        await authService.logout(jsonWebTokenEntity.refreshToken);
        expect(checkExistedJsonWebToken).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const checkExistedJsonWebToken = jest.fn().mockResolvedValueOnce(true);
        const authService = new AuthService(
          null,
          null,
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken},
          {deleteJsonWebToken: async () => null}
        );
        await authService.logout(jsonWebTokenEntity.refreshToken);
        expect(checkExistedJsonWebToken).toHaveBeenCalledWith(jsonWebTokenEntity.refreshToken);
      });

      it(`should throw error if token isn't existed`, async () => {
        const authService = new AuthService(
          null,
          null,
          null,
          null,
          {checkExistedJsonWebToken: async () => false},
          null
        );
        await expect(authService.logout(jsonWebTokenEntity.refreshToken)).rejects
          .toThrow(new Error(`JSON Web Token isn't existed`));
      });
    });

    describe(`deleteJsonWebToken method of JsonWebTokenDeleterService`, () => {
      it(`should call`, async () => {
        const deleteJsonWebToken = jest.fn();
        const authService = new AuthService(
          null,
          null,
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken}
        );
        await authService.logout(jsonWebTokenEntity.refreshToken);
        expect(deleteJsonWebToken).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const deleteJsonWebToken = jest.fn();
        const authService = new AuthService(
          null,
          null,
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken}
        );
        await authService.logout(jsonWebTokenEntity.refreshToken);
        expect(deleteJsonWebToken).toHaveBeenCalledWith(jsonWebTokenEntity.refreshToken);
      });
    });
  });
});
