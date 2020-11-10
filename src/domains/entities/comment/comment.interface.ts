import { IHotel } from '../hotel';
import { IUser } from '../user';


export interface IComment {
  id: number;
  text: string;
  date: Date;
  rating: number;
  hotel: IHotel;
  user: IUser;
}
