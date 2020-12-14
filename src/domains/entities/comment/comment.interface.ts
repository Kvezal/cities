import {
  HotelEntity,
  IHotel,
  IUser,
  UserEntity,
} from 'domains/entities';


export interface IComment {
  id?: string;
  text: string;
  createdAt?: Date;
  hotel: IHotel | HotelEntity;
  user: IUser | UserEntity;
  rating: number;
}
