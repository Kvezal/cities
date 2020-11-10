import { IUserType } from '../user-type';
import { IImage } from '../image';


export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  type: IUserType;
  image: IImage;
}
