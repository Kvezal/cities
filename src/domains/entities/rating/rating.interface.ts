import { IHotel } from '../hotel';
import { IUser } from '../user';


export interface IRating {
  value: number;
  user: IUser;
  hotel: IHotel;
}
