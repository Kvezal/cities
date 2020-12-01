import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { IJsonWebTokenParams, JsonWebTokenEntity } from 'domains/entities';
import { IUserAuthenticate } from 'domains/interfaces';
import {
  AuthenticateUserUseCase,
  CheckTokenUseCase,
  DecodeAccessTokenUseCase,
  RefreshTokenUseCase,
} from 'domains/use-cases';


const MAX_AGE_ACCESS_TOKEN_COOKIE = Number(process.env.MAX_AGE_ACCESS_TOKEN_COOKIE);

@Injectable()
export class AuthControllerService implements
  AuthenticateUserUseCase,
  CheckTokenUseCase,
  DecodeAccessTokenUseCase,
  RefreshTokenUseCase {
  public async authenticateUser(params: IUserAuthenticate): Promise<JsonWebTokenEntity> {
    return null;
  }

  public async checkAccessToken(token: string): Promise<boolean> {
    return null;
  }

  public async decodeAccessToken(token: string): Promise<IJsonWebTokenParams> {
    return null;
  }

  public async refreshToken(token: string): Promise<JsonWebTokenEntity> {
    return null;
  }

  public setTokens(response: Response, jsonWebTokenEntity): void {
    response.cookie(`access-token`, jsonWebTokenEntity.accessToken, {
      maxAge: MAX_AGE_ACCESS_TOKEN_COOKIE,
      sameSite: true,
    });
    response.cookie(`refresh-token`, jsonWebTokenEntity.refreshToken, {
      httpOnly: true,
      sameSite: true,
    });
  }
}
