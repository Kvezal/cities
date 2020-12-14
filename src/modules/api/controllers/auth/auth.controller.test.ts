import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { parse } from 'cookie';
import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';

import { IJsonWebTokenParams, JsonWebTokenEntity } from 'domains/entities';
import { EJsonWebTokenType, EUserField, JsonWebTokenError, UserError } from 'domains/exceptions';
import { authServiceSymbol } from 'domains/services';
import { ConfigService } from 'modules/config';

import { AuthControllerService } from './auth-controller.service';
import { AuthController } from './auth.controller';


const jsonWebTokenParams: IJsonWebTokenParams = {
  id: `1`,
  name: `name`,
  email: `email@gmail.com`,
  image: `image`,
};


describe(`AuthController`, () => {
  let app: INestApplication;
  let service: AuthControllerService;

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthControllerService,
        {
          provide: authServiceSymbol,
          useValue: {
            authenticateUser: async () => null,
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

    app = testModule.createNestApplication();
    app.use(cookieParser());
    await app.init();
    service = testModule.get<AuthControllerService>(AuthControllerService);
  });

  describe(`POST`, () => {
    describe(`/api/auth/login end point`, () => {
      const loginUrl = `/api/auth/login`;

      beforeEach(() => {
        jest.spyOn(service, `authenticateUser`).mockImplementation(
          async () => JsonWebTokenEntity.generate(jsonWebTokenParams)
        );
      });

      it(`if request without data status code should be 400`, async () => {
        const result = await request(app.getHttpServer())
          .post(loginUrl)
          .send();
        expect(result.status).toBe(HttpStatus.BAD_REQUEST);
      });

      it(`if request with valid data status code should be 201`, async () => {
        const result = await request(app.getHttpServer())
          .post(loginUrl)
          .send({
            email: `test@gmail.com`,
            password: `test123456`,
          });
        expect(result.status).toBe(HttpStatus.CREATED);
      });

      describe(`"email" property`, () => {
        it(`if request without property status code should be 400`, async () => {
          const result = await request(app.getHttpServer())
            .post(loginUrl)
            .send({
              password: `test123456`,
            });
          expect(result.status).toBe(HttpStatus.BAD_REQUEST);
        });

        it(`if request with invalid property status code should be 400`, async () => {
          const result = await request(app.getHttpServer())
            .post(loginUrl)
            .send({
              email: `test`,
              password: `test123456`,
            });
          expect(result.status).toBe(HttpStatus.BAD_REQUEST);
        });
      });

      describe(`"password" property`, () => {
        it(`if request without property status code should be 400`, async () => {
          const result = await request(app.getHttpServer())
            .post(loginUrl)
            .send({
              email: `test@gmail.com`,
            });
          expect(result.status).toBe(HttpStatus.BAD_REQUEST);
        });

        it(`if request with too short property status code should be 400`, async () => {
          const result = await request(app.getHttpServer())
            .post(loginUrl)
            .send({
              email: `test@gmail.com`,
              password: `test1`
            });
          expect(result.status).toBe(HttpStatus.BAD_REQUEST);
        });

        it(`if request with invalid password status code should be 400`, async () => {
          jest.spyOn(service, `authenticateUser`).mockImplementation(async () => {
            throw new UserError({
              field: EUserField.PASSWORD,
              message: `test`,
            });
          });
          const result = await request(app.getHttpServer())
            .post(loginUrl)
            .send({
              email: `test@gmail.com`,
              password: `test12`
            });
          expect(result.status).toBe(HttpStatus.BAD_REQUEST);
        });
      });

      it.each([`refresh-token`, `access-token`])(`if request is valid should set %p header`, async (cookieName: string) => {
        const result = await request(app.getHttpServer())
          .post(loginUrl)
          .send({
            email: `test@gmail.com`,
            password: `test12`
          });
        const cookies = result.headers[`set-cookie`].map((cookie) => parse(cookie));
        const hasToken = cookies.some((cookie: string) => Boolean(cookie[cookieName]));
        expect(hasToken).toBeTruthy();
      });
    });

    describe(`/api/auth/refresh end point`, () => {
      const refreshUrl = `/api/auth/refresh`;

      it(`if request with invalid refresh-token header status code should be 401 `, async () => {
        jest.spyOn(service, `refreshToken`).mockImplementationOnce(async () => {
          throw new JsonWebTokenError({
            type: EJsonWebTokenType.INVALID,
            message: `test`,
          });
        });
        const result = await request(app.getHttpServer())
          .post(refreshUrl)
          .send()
          .set(`refresh-token`, `refresh-token`);
        expect(result.status).toBe(HttpStatus.UNAUTHORIZED);
      });

      it(`if request with valid refresh-token header status code should be 201 `, async () => {
        jest.spyOn(service, `refreshToken`).mockImplementationOnce(async () => {
          return JsonWebTokenEntity.generate(jsonWebTokenParams)
        });
        const result = await request(app.getHttpServer())
          .post(refreshUrl)
          .send()
          .set(`refresh-token`, `refresh-token`);
        expect(result.status).toBe(HttpStatus.CREATED);
      });

      it.each([`refresh-token`, `access-token`])(`if request with valid refresh-token header should set header tokens`, async (cookieName: string) => {
        jest.spyOn(service, `refreshToken`).mockImplementationOnce(async () => {
          return JsonWebTokenEntity.generate(jsonWebTokenParams)
        });
        const result = await request(app.getHttpServer())
          .post(refreshUrl)
          .send()
          .set(`refresh-token`, `refresh-token`);
        const cookies = result.headers[`set-cookie`].map((cookie) => parse(cookie));
        const hasToken = cookies.some((cookie) => Boolean(cookie[cookieName]));
        expect(hasToken).toBeTruthy();
      });
    });
  });

  describe(`GET`, () => {
    describe(`/api/auth/decode end point`, () => {
      const decodeUrl = `/api/auth/decode`;

      it(`if request with valid access-token header status code should be 200`, async () => {
        jest.spyOn(service, `decodeAccessToken`).mockImplementation(async () => null);
        const result = await request(app.getHttpServer())
          .get(decodeUrl)
          .set(`access-token`, `access-token`)
          .send();
        expect(result.status).toBe(HttpStatus.OK);
      });

      it(`if request with valid access-token header should return result of decodeAccessToken`, async () => {
        jest.spyOn(service, `decodeAccessToken`).mockImplementation(async () => jsonWebTokenParams);
        const result = await request(app.getHttpServer())
          .get(decodeUrl)
          .set(`access-token`, `access-token`)
          .send();
        expect(result.body).toEqual(jsonWebTokenParams);
      });

      it(`if request with invalid access-token header status code should be 401`, async () => {
        jest.spyOn(service, `decodeAccessToken`).mockImplementation(async () => {
          throw new JsonWebTokenError({
            type: EJsonWebTokenType.INVALID,
            message: `JSON Web Token is invalid`,
          });
        });
        const result = await request(app.getHttpServer())
          .get(decodeUrl)
          .set(`access-token`, `access-token`)
          .send();
        expect(result.status).toBe(HttpStatus.UNAUTHORIZED);
      });

      it(`if request without access-token header status code should be 401`, async () => {
        jest.spyOn(service, `decodeAccessToken`).mockImplementation(async () => {
          throw new JsonWebTokenError({
            type: EJsonWebTokenType.INVALID,
            message: `JSON Web Token is invalid`,
          });
        });
        const result = await request(app.getHttpServer())
          .get(decodeUrl)
          .send();
        expect(result.status).toBe(HttpStatus.UNAUTHORIZED);
      });
    });
  });

  describe(`HEAD`, () => {
    describe(`/api/auth/check end point`, () => {
      const checkUrl = `/api/auth/check`;

      it(`if request with valid access-token header status code should be 204`, async () => {
        jest.spyOn(service, `checkAccessToken`).mockImplementation(async () => true);
        const result = await request(app.getHttpServer())
          .head(checkUrl)
          .set(`access-token`, `access-token`)
          .send();
        expect(result.status).toBe(HttpStatus.NO_CONTENT);
      });

      it(`if request with invalid access-token header status code should be 401`, async () => {
        jest.spyOn(service, `checkAccessToken`).mockImplementation(async () => {
          throw new JsonWebTokenError({
            type: EJsonWebTokenType.INVALID,
            message: `JSON Web Token is invalid`,
          });
        });
        const result = await request(app.getHttpServer())
          .head(checkUrl)
          .set(`access-token`, `access-token`)
          .send();
        expect(result.status).toBe(HttpStatus.UNAUTHORIZED);
      });

      it(`if request without access-token header status code should be 401`, async () => {
        jest.spyOn(service, `checkAccessToken`).mockImplementation(async () => {
          throw new JsonWebTokenError({
            type: EJsonWebTokenType.INVALID,
            message: `JSON Web Token is invalid`,
          });
        });
        const result = await request(app.getHttpServer())
          .head(checkUrl)
          .send();
        expect(result.status).toBe(HttpStatus.UNAUTHORIZED);
      });
    });
  });
});
