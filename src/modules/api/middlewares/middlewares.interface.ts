import { Request } from 'express';


export interface IRequest extends Request {
  locals: {
    accessToken: string;
    refreshToken: string;
    userId?: string;
  };
}