import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';

import { JsonWebTokenEntity } from 'domains/entities';
import { IUserAuthenticate } from 'domains/interfaces';
import {
  AuthenticateUserUseCase,
  CheckTokenUseCase,
  DecodeAccessTokenUseCase,
  RefreshTokenUseCase,
} from 'domains/use-cases';
import {
  AuthService,
  authServiceSymbol,
} from 'domains/services';
import { ConfigService } from 'modules/config';
import { JsonWebTokenParams } from 'modules/api/controllers/auth/auth.interface';


@Injectable()
export class AuthControllerService implements
  AuthenticateUserUseCase,
  CheckTokenUseCase,
  DecodeAccessTokenUseCase,
  RefreshTokenUseCase {
  constructor(
    private readonly _configService: ConfigService,
    @Inject(authServiceSymbol) private readonly _authService: AuthService
  ) {}

  public async authenticateUser(params: IUserAuthenticate): Promise<JsonWebTokenEntity> {
    return this._authService.authenticateUser(params);
  }

  public async checkAccessToken(token: string): Promise<boolean> {
    return this._authService.checkAccessToken(token);
  }

  public async decodeAccessToken(token: string): Promise<JsonWebTokenParams> {
    return this._authService.decodeAccessToken(token);
  }

  public async refreshToken(token: string): Promise<JsonWebTokenEntity> {
    return this._authService.refreshToken(token);
  }

  public setTokens(response: Response, jsonWebTokenEntity: JsonWebTokenEntity): void {
    response.cookie(`access-token`, jsonWebTokenEntity.accessToken, {
      maxAge: +this._configService.getGlobalEnvironmentVariable(`MAX_AGE_ACCESS_TOKEN_COOKIE`),
      sameSite: true,
    });
    response.cookie(`refresh-token`, jsonWebTokenEntity.refreshToken, {
      httpOnly: true,
      sameSite: true,
    });
  }
}
