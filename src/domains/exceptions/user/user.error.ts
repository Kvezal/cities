import { Exception } from '../exception';
import { EUserField } from './user.error.interface';


export class UserError extends Exception<EUserField> {}
