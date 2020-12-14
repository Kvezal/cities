import {
  Inject,
  NestMiddleware,
} from '@nestjs/common';
import { Response } from 'express';
import {
  AuthService,
  authServiceSymbol,
} from 'domains/services';

import { IRequest } from '../middlewares.interface';
import {
  IJsonWebTokenParams,
  JsonWebTokenEntity,
} from 'domains/entities';
import { ConfigService } from 'modules/config';


export class RefreshJsonWebTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly _configService: ConfigService,
    @Inject(authServiceSymbol) private readonly _authService: AuthService
  ) {}


  public async use(req: IRequest, res: Response, next: () => void): Promise<void> {
    if (req.locals.userId) {
      return next();
    }
    const refreshToken: string = req.cookies?.[`refresh-token`];
    if (!refreshToken) {
      return next();
    }
    const jsonWebTokenEntity: JsonWebTokenEntity = await this._authService.refreshToken(refreshToken).catch(() => null);
    if (!jsonWebTokenEntity) {
      return next();
    }
    this.setTokens(res, jsonWebTokenEntity);
    const user: IJsonWebTokenParams = await this._authService.decodeAccessToken(jsonWebTokenEntity.accessToken).catch(() => null);
    req.locals.userId = user.id;
    next();
  }

  public setTokens(res: Response, jsonWebTokenEntity: JsonWebTokenEntity): void {
    res.cookie(`access-token`, jsonWebTokenEntity.accessToken, {
      maxAge: +this._configService.getGlobalEnvironmentVariable(`MAX_AGE_ACCESS_TOKEN_COOKIE`),
      sameSite: true,
    });
    res.cookie(`refresh-token`, jsonWebTokenEntity.refreshToken, {
      httpOnly: true,
      sameSite: true,
    });
  }
}