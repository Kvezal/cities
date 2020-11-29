import { hash } from 'bcrypt';

import { SALT_ROUND } from 'domains/constants';
import { IJsonWebTokenParams, IUser, JsonWebTokenEntity, UserEntity } from 'domains/entities';
import { IUserAuthenticate } from 'domains/interfaces';

import { AuthService } from './auth.service';


const authenticateParam: IUserAuthenticate = {
  email: `email@gmail.com`,
  password: `password`,
};

const jsonWebTokenEntityParams: IJsonWebTokenParams = {
  id: `1`,
  name: `name`,
  email: `email@gmail.com`,
  image: {
    id: `1`,
    title: `title`,
  },
};

const userEntityParams: IUser = {
  ...jsonWebTokenEntityParams,
  password: `password`,
  type: {
    id: `1`,
    title: `title`,
  },
};

describe(`Auth service`, () => {
  describe(`authenticate method`, () => {
    let password: string;
    let userEntity: UserEntity;

    beforeAll(async () => {
      password = await hash(userEntityParams.password, SALT_ROUND);
      userEntity = UserEntity.create({
        ...userEntityParams,
        password
      });
    });

    describe(`loadUserByEmail method`, () => {
      it(`should call`, async () => {
        const loadUserByEmail = jest.fn().mockResolvedValueOnce(userEntity);
        const authService = new AuthService(
          {loadUserByEmail},
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
          {saveJsonWebToken: async () => null},
          null,
          null
        );
        await authService.authenticateUser(authenticateParam);
        expect(loadUserByEmail).toHaveBeenCalledWith(authenticateParam.email);
      });

      it(`should throw error if user isn't existed`, async () => {
        const loadUserByEmail = jest.fn().mockResolvedValueOnce(null);
        const authService = new AuthService(
          {loadUserByEmail},
          null,
          null,
          null
        );
        await expect(authService.authenticateUser(authenticateParam)).rejects
          .toThrow(new Error(`user with ${authenticateParam.email} id is not existed`));
      });
    });

    describe(`generate method of JsonWebTokenEntity`, () => {
      it(`should call`, async () => {
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

      it(`should call with params`, async () => {
        JsonWebTokenEntity.generate = jest.fn(JsonWebTokenEntity.generate);
        const authService = new AuthService(
          {loadUserByEmail: jest.fn().mockReturnValue(userEntity)},
          {saveJsonWebToken: () => null},
          null,
          null
        );
        await authService.authenticateUser(authenticateParam);
        expect(JsonWebTokenEntity.generate).toHaveBeenCalledWith({
          id: userEntity.id,
          name: userEntity.name,
          email: userEntity.name,
          image: userEntity.image,
        });
      });
    });

    describe(`saveJsonWebToken method of JsonWebTokenSaverService`, () => {
      it(`should call`, async () => {
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

      it(`should call with params`, async () => {
        const saveJsonWebToken = jest.fn();
        const jsonWebTokenEntity = JsonWebTokenEntity.generate({
          id: userEntity.id,
          name: userEntity.name,
          email: userEntity.name,
          image: userEntity.image,
        });
        JsonWebTokenEntity.generate = jest.fn(JsonWebTokenEntity.generate).mockReturnValueOnce(jsonWebTokenEntity);
        const authService = new AuthService(
          {loadUserByEmail: jest.fn().mockReturnValue(userEntity)},
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
        {saveJsonWebToken: async () => null},
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

    describe(`checkAccessToken of JsonWebTokenEntity`, () => {
      it(`should call`, async () => {
        jsonWebTokenEntity.checkAccessToken = jest.fn();
        await authService.checkAccessToken(jsonWebTokenEntity);
        expect(jsonWebTokenEntity.checkAccessToken).toHaveBeenCalledTimes(1);
      });

      it(`should call without params`, async () => {
        jsonWebTokenEntity.checkAccessToken = jest.fn();
        await authService.checkAccessToken(jsonWebTokenEntity);
        expect(jsonWebTokenEntity.checkAccessToken).toHaveBeenCalledWith();
      });
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

    describe(`decodeAccessToken of JsonWebTokenEntity`, () => {
      it(`should call`, async () => {
        jsonWebTokenEntity.decodeAccessToken = jest.fn();
        await authService.decodeAccessToken(jsonWebTokenEntity);
        expect(jsonWebTokenEntity.decodeAccessToken).toHaveBeenCalledTimes(1);
      });

      it(`should call without params`, async () => {
        jsonWebTokenEntity.decodeAccessToken = jest.fn();
        await authService.decodeAccessToken(jsonWebTokenEntity);
        expect(jsonWebTokenEntity.decodeAccessToken).toHaveBeenCalledWith();
      });
    });

    it(`should return result of JsonWebTokenEntity.decodeAccessToken`, async () => {
      jsonWebTokenEntity.decodeAccessToken = jest.fn().mockReturnValue(jsonWebTokenEntityParams);
      const result = await authService.decodeAccessToken(jsonWebTokenEntity);
      expect(result).toEqual(jsonWebTokenEntityParams);
    });
  });

  describe(`refreshToken method`, () => {
    const jsonWebTokenEntity: JsonWebTokenEntity = JsonWebTokenEntity.generate(jsonWebTokenEntityParams);

    describe(`checkRefreshToken method of JsonWebTokenEntity`, () => {
      it(`should call`, async () => {
        jsonWebTokenEntity.checkRefreshToken = jest.fn(jsonWebTokenEntity.checkRefreshToken);
        const authService = new AuthService(
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        await authService.refreshToken(jsonWebTokenEntity);
        expect(jsonWebTokenEntity.checkRefreshToken).toHaveBeenCalledTimes(1);
      });

      it(`should call without params`, async () => {
        jsonWebTokenEntity.checkRefreshToken = jest.fn(jsonWebTokenEntity.checkRefreshToken);
        const authService = new AuthService(
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        await authService.refreshToken(jsonWebTokenEntity);
        expect(jsonWebTokenEntity.checkRefreshToken).toHaveBeenCalledWith();
      });

      it(`should throw error if token is invalid`, async () => {
        jsonWebTokenEntity.checkRefreshToken = jest.fn(jsonWebTokenEntity.checkRefreshToken)
          .mockResolvedValueOnce(false);
        const authService = new AuthService(
          null,
          null,
          null,
          null
        );
        await expect(authService.refreshToken(jsonWebTokenEntity)).rejects
          .toThrow(new Error(`JSON Web Token is invalid`));
      });
    });

    describe(`checkExistedJsonWebToken method of JsonWebTokenCheckerService`, () => {
      it(`should call`, async () => {
        const checkExistedJsonWebToken = jest.fn().mockResolvedValueOnce(true);
        const authService = new AuthService(
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken},
          {deleteJsonWebToken: async () => null}
        );
        await authService.refreshToken(jsonWebTokenEntity);
        expect(checkExistedJsonWebToken).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const checkExistedJsonWebToken = jest.fn().mockResolvedValueOnce(true);
        const authService = new AuthService(
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken},
          {deleteJsonWebToken: async () => null}
        );
        await authService.refreshToken(jsonWebTokenEntity);
        expect(checkExistedJsonWebToken).toHaveBeenCalledWith(jsonWebTokenEntity.refreshToken);
      });

      it(`should throw error if token isn't existed`, async () => {
        const authService = new AuthService(
          null,
          null,
          {checkExistedJsonWebToken: async () => false},
          null
        );
        await expect(authService.refreshToken(jsonWebTokenEntity)).rejects
          .toThrow(new Error(`JSON Web Token isn't existed`));
      });
    });

    describe(`deleteJsonWebToken method of JsonWebTokenDeleterService`, () => {
      it(`should call`, async () => {
        const deleteJsonWebToken = jest.fn();
        const authService = new AuthService(
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken}
        );
        await authService.refreshToken(jsonWebTokenEntity);
        expect(deleteJsonWebToken).toHaveBeenCalledTimes(1);
      });

      it(`should call with params`, async () => {
        const deleteJsonWebToken = jest.fn();
        const authService = new AuthService(
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken}
        );
        await authService.refreshToken(jsonWebTokenEntity);
        expect(deleteJsonWebToken).toHaveBeenCalledWith(jsonWebTokenEntity.refreshToken);
      });
    });

    describe(`refresh method of JsonWebTokenEntity`, () => {
      it(`should call`, async () => {
        jsonWebTokenEntity.refresh = jest.fn(jsonWebTokenEntity.refresh);
        const authService = new AuthService(
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        await authService.refreshToken(jsonWebTokenEntity);
        expect(jsonWebTokenEntity.refresh).toHaveBeenCalledTimes(1);
      });

      it(`should call without params`, async () => {
        jsonWebTokenEntity.refresh = jest.fn(jsonWebTokenEntity.refresh);
        const authService = new AuthService(
          null,
          {saveJsonWebToken: async () => null},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        await authService.refreshToken(jsonWebTokenEntity);
        expect(jsonWebTokenEntity.refresh).toHaveBeenCalledWith();
      });
    });

    describe(`saveJsonWebToken method of JsonWebTokenSaverService`, () => {
      it(`should call`, async () => {
        const saveJsonWebToken = jest.fn();
        const authService = new AuthService(
          null,
          {saveJsonWebToken},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        await authService.refreshToken(jsonWebTokenEntity);
        expect(saveJsonWebToken).toHaveBeenCalledTimes(1);
      });

      it(`should be called with params`, async () => {
        jsonWebTokenEntity.refresh = jest.fn().mockReturnValue(jsonWebTokenEntity);
        const saveJsonWebToken = jest.fn();
        const authService = new AuthService(
          null,
          {saveJsonWebToken},
          {checkExistedJsonWebToken: async () => true},
          {deleteJsonWebToken: async () => null}
        );
        await authService.refreshToken(jsonWebTokenEntity);
        expect(saveJsonWebToken).toHaveBeenCalledWith(jsonWebTokenEntity.refreshToken);
      });
    });
  });
});
