import { IHotel } from '../hotel';
import { IUser } from '../user';


export interface IFavorite {
  value: boolean,
  user: IUser;
  hotel: IHotel;
}
