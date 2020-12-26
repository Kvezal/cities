import { Test, TestingModule } from '@nestjs/testing';

import { IJsonWebTokenParams, JsonWebTokenEntity } from 'domains/entities';
import { AuthService, authServiceSymbol } from 'domains/services';
import { AuthLoginDto } from 'modules/api/interfaces';
import { ConfigService } from 'modules/config';

import { AuthControllerService } from './auth-controller.service';


const authenticateUserParams: AuthLoginDto = {
  email: `test@gmail.com`,
  password: `test123456`,
};

const jsonWebTokenParams: IJsonWebTokenParams = {
  id: `1`,
  name: `name`,
  email: `email@gmail.com`,
  image: null,
};

describe('AuthControllerService', () => {
  let service: AuthControllerService;
  let authService: AuthService;
  let configService: ConfigService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        AuthControllerService,
        {
          provide: authServiceSymbol,
          useValue: {
            authenticateUser: async () => null,
            logout: async () => null,
            checkAccessToken: async () => null,
            decodeAccessToken: async () => null,
            refreshToken: async () => null,
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getGlobalEnvironmentVariable: () => null,
          }
        }
      ],
    }).compile();

    service = testModule.get<AuthControllerService>(AuthControllerService);
    authService = testModule.get<AuthService>(authServiceSymbol);
    configService = testModule.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`authenticateUser method`, () => {
    it(`should call authenticateUser method of AuthService`, async () => {
      const authenticateUser = jest.spyOn(authService, `authenticateUser`);
      await service.authenticateUser(authenticateUserParams);
      expect(authenticateUser).toHaveBeenCalledTimes(1);
    });

    it(`should call authenticateUser method of AuthService with params`, async () => {
      const authenticateUser = jest.spyOn(authService, `authenticateUser`);
      await service.authenticateUser(authenticateUserParams);
      expect(authenticateUser).toHaveBeenCalledWith(authenticateUserParams);
    });

    it(`should return result of authenticateUser method of AuthService`, async () => {
      const jsonWebTokenEntity = await JsonWebTokenEntity.generate(jsonWebTokenParams);
      jest.spyOn(authService, `authenticateUser`).mockImplementationOnce(async () => jsonWebTokenEntity);
      const result: JsonWebTokenEntity = await service.authenticateUser(authenticateUserParams);
      expect(result).toBe(jsonWebTokenEntity);
    });
  });

  describe(`logout method`, () => {
    const refreshToken = `test`;

    it(`should call logout method of AuthService`, async () => {
      const logout = jest.spyOn(authService, `logout`);
      await service.logout(refreshToken)
      expect(logout).toHaveBeenCalledTimes(1);
    });

    it(`should call logout method of AuthService with params`, async () => {
      const logout = jest.spyOn(authService, `logout`);
      await service.logout(refreshToken)
      expect(logout).toHaveBeenCalledWith(refreshToken);
    });
  });

  describe(`decodeAccessToken method`, () => {
    const accessToken = `access-token`;

    it(`should call decodeAccessToken method of AuthService`, async () => {
      const decodeAccessToken = jest.spyOn(authService, `decodeAccessToken`);
      await service.decodeAccessToken(accessToken);
      expect(decodeAccessToken).toHaveBeenCalledTimes(1);
    });

    it(`should call decodeAccessToken method of AuthService with params`, async () => {
      const decodeAccessToken = jest.spyOn(authService, `decodeAccessToken`);
      await service.decodeAccessToken(accessToken);
      expect(decodeAccessToken).toHaveBeenCalledWith(accessToken);
    });

    it(`should return result of decodeAccessToken method of AuthService`, async () => {
      jest.spyOn(authService, `decodeAccessToken`).mockImplementation(async () => jsonWebTokenParams);
      const result: IJsonWebTokenParams = await service.decodeAccessToken(accessToken);
      expect(result).toBe(jsonWebTokenParams);
    });
  });

  describe(`refreshToken method`, () => {
    const token = `refresh-token`;

    it(`should call refreshToken method of AuthService`, async () => {
      const refreshToken = jest.spyOn(authService, `refreshToken`);
      await service.refreshToken(token);
      expect(refreshToken).toHaveBeenCalledTimes(1);
    });

    it(`should call refreshToken method of AuthService with params`, async () => {
      const refreshToken = jest.spyOn(authService, `refreshToken`);
      await service.refreshToken(token);
      expect(refreshToken).toHaveBeenCalledWith(token);
    });

    it(`should return result of refreshToken method of AuthService`, async () => {
      const jsonWebTokenEntity = await JsonWebTokenEntity.generate(jsonWebTokenParams);
      jest.spyOn(authService, `refreshToken`).mockImplementation(async () => jsonWebTokenEntity);
      const result: JsonWebTokenEntity = await service.refreshToken(token);
      expect(result).toBe(jsonWebTokenEntity);
    });
  });

  describe(`setTokens method`, () => {
    it(`should call cookie method of response`, async () => {
      const jsonWebTokenEntity = await JsonWebTokenEntity.generate(jsonWebTokenParams);
      const response: any = {
        cookie: jest.fn(),
      };
      service.setTokens(response, jsonWebTokenEntity);
      expect(response.cookie).toHaveBeenCalledTimes(2);
    });

    it(`should call cookie method of response with access token params`, async () => {
      const maxAge = `1000`;
      const jsonWebTokenEntity = await JsonWebTokenEntity.generate(jsonWebTokenParams);
      jest.spyOn(configService, `getGlobalEnvironmentVariable`).mockImplementationOnce(() => maxAge);
      const response: any = {
        cookie: jest.fn(),
      };
      service.setTokens(response, jsonWebTokenEntity);
      expect(response.cookie).toHaveBeenNthCalledWith(1, `access-token`, jsonWebTokenEntity.accessToken, {
        maxAge: +maxAge,
        sameSite: true,
      });
    });

    it(`should call cookie method of response with refresh token params`, async () => {
      const jsonWebTokenEntity = await JsonWebTokenEntity.generate(jsonWebTokenParams);
      const response: any = {
        cookie: jest.fn(),
      };
      service.setTokens(response, jsonWebTokenEntity);
      expect(response.cookie).toHaveBeenNthCalledWith(2, `refresh-token`, jsonWebTokenEntity.refreshToken, {
        httpOnly: true,
        sameSite: true,
      });
    });
  });
});
