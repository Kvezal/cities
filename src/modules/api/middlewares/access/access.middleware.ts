import {
  Inject,
  NestMiddleware,
} from '@nestjs/common';

import {
  AuthService,
  authServiceSymbol,
} from 'domains/services';
import {
  EJsonWebTokenType,
  JsonWebTokenError,
} from 'domains/exceptions';

import { IRequest } from '../middlewares.interface';


export class AccessMiddleware implements NestMiddleware {
  constructor(@Inject(authServiceSymbol) private readonly _authService: AuthService) {}


  public async use(req: IRequest, res: Response, next: () => void): Promise<void> {
    const accessToken = req.locals.accessToken;
    if (!accessToken) {
      throw new JsonWebTokenError({
        type: EJsonWebTokenType.IS_NOT_EXISTED,
        message: `JSON Web Token doesn't exist`,
      });
    }
    const hasAccess = await this._authService.checkAccessToken(accessToken);
    if (!hasAccess) {
      throw new JsonWebTokenError({
        type: EJsonWebTokenType.INVALID,
        message: `JSON Web Token is invalid`,
      });
    }
    next();
  }
}