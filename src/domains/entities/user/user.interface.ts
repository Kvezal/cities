import { IImage, ImageEntity, IUserType, UserTypeEntity } from 'domains/entities';


export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  type: IUserType | UserTypeEntity;
  image: IImage | ImageEntity;
}
