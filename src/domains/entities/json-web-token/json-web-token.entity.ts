import { decode, sign, verify } from 'jsonwebtoken';

import { IJsonWebToken, IJsonWebTokenParams } from './json-web-token.interface';


export class JsonWebTokenEntity {
  constructor(
    private readonly _accessToken: string,
    private readonly _refreshToken: string
  ) {}

  get accessToken(): string {
    return this._accessToken;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  static create(params: IJsonWebToken): JsonWebTokenEntity {
    return new JsonWebTokenEntity(
      params.accessToken,
      params.refreshToken
    );
  }

  static generate(params: IJsonWebTokenParams): JsonWebTokenEntity {
    return JsonWebTokenEntity.create({
      accessToken: sign(params, process.env.JWT_ACCESS_SECRET, {expiresIn: `${process.env.MAX_AGE_ACCESS_TOKEN_COOKIE}ms`}),
      refreshToken: sign(params, process.env.JWT_REFRESH_SECRET)
    });
  }

  static async checkAccessToken(accessToken: string): Promise<boolean> {
    return await verify(
      accessToken, process.env.JWT_ACCESS_SECRET,
      (error) => !error
    );
  }

  static async decodeAccessToken(accessToken: string): Promise<IJsonWebTokenParams> {
    return await decode(
      accessToken, process.env.JWT_ACCESS_SECRET,
      (error, tokenData) => error ? null : tokenData
    );
  }

  static async checkRefreshToken(refreshToken: string): Promise<boolean> {
    return await verify(
      refreshToken, process.env.JWT_REFRESH_SECRET,
      (error) => !error
    );
  }

  static async refresh(refreshToken: string): Promise<JsonWebTokenEntity> {
    const refreshTokenData = await decode(
      refreshToken, process.env.JWT_REFRESH_SECRET,
      (error, tokenData) => error ? null : tokenData
    );
    return JsonWebTokenEntity.generate(refreshTokenData);
  }
}
