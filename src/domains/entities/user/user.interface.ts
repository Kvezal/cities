import { IImage, ImageEntity, IUserType, UserTypeEntity } from 'domains/entities';


export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  image: IImage | ImageEntity;
  type: IUserType | UserTypeEntity;
}
