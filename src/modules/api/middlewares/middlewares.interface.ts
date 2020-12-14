import { Request } from 'express';


export interface IRequest extends Request {
  locals: {
    userId?: string;
  };
}