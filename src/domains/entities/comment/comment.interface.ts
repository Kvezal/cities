import {
  IUser,
  UserEntity,
} from 'domains/entities';


export interface IComment {
  id?: string;
  text: string;
  createdAt?: Date;
  hotelId: string;
  user: IUser | UserEntity;
  rating: number;
}
