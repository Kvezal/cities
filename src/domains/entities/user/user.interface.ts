import { IUserType, UserTypeEntity } from '../user-type';
import { IImage, ImageEntity } from '../image';


export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  type: IUserType | UserTypeEntity;
  image: IImage | ImageEntity;
}
