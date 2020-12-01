import { Exception } from '../exception';
import { EJsonWebTokenType } from './json-web-token.error.interface';


export class JsonWebTokenError extends Exception<null, EJsonWebTokenType> {}
