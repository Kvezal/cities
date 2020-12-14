import { NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

import { IRequest } from '../middlewares.interface';


export class InitLocalsMiddleware implements NestMiddleware{
  public use(req: IRequest, res: Response, next: () => void) {
    req.locals = {};
    next();
  }
}