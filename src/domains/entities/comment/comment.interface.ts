import { HotelEntity, IHotel } from '../hotel';
import { IUser, UserEntity } from '../user';
import { RatingEntity } from '../rating';


export interface IComment {
  id: number;
  text: string;
  date: Date;
  rating: number | RatingEntity;
  hotel: IHotel | HotelEntity;
  user: IUser | UserEntity;
}
