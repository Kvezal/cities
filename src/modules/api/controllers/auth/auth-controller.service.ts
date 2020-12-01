import { Injectable } from '@nestjs/common';

import { IJsonWebTokenParams, JsonWebTokenEntity } from 'domains/entities';
import { IUserAuthenticate } from 'domains/interfaces';
import {
  AuthenticateUserUseCase,
  CheckTokenUseCase,
  DecodeAccessTokenUseCase,
  RefreshTokenUseCase,
} from 'domains/use-cases';


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
}
