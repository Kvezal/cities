import {
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response } from 'express';

import { IJsonWebTokenParams } from 'domains/entities';
import {
  AuthService,
  authServiceSymbol,
} from 'domains/services';

import { IRequest } from '../middlewares.interface';


@Injectable()
export class DecodeJsonWebTokenMiddleware implements NestMiddleware {
  constructor(@Inject(authServiceSymbol) private readonly _authService: AuthService) {}


  public async use(req: IRequest, res: Response, next: () => void): Promise<void> {
    const accessToken: string = req.locals.accessToken;
    if (!accessToken) {
      return next();
    }
    const user: IJsonWebTokenParams = await this._authService.decodeAccessToken(accessToken).catch(() => null);
    if (user) {
      req.locals.userId = user.id;
    }
    next();
  }
}

