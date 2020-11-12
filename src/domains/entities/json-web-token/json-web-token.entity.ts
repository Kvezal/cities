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

  async checkAccessToken(): Promise<boolean> {
    return await verify(
      this.accessToken, process.env.JWT_ACCESS_SECRET,
      (error) => !error
    );
  }

  async decodeAccessToken(): Promise<IJsonWebTokenParams> {
    return await decode(
      this.accessToken, process.env.JWT_ACCESS_SECRET,
      (error, tokenData) => error ? null : tokenData
    );
  }

  async checkRefreshToken(): Promise<boolean> {
    return await verify(
      this.refreshToken, process.env.JWT_REFRESH_SECRET,
      (error) => !error
    );
  }

  async refresh(): Promise<JsonWebTokenEntity> {
    const refreshTokenData = await decode(
      this.refreshToken, process.env.JWT_REFRESH_SECRET,
      (error, tokenData) => error ? null : tokenData
    );
    return JsonWebTokenEntity.generate(refreshTokenData);
  }
}
