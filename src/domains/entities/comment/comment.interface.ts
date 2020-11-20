import { HotelEntity, IHotel, IUser, RatingEntity, UserEntity } from 'domains/entities';


export interface IComment {
  id: string;
  text: string;
  createdAt: Date;
  rating: number | RatingEntity;
  hotel: IHotel | HotelEntity;
  user: IUser | UserEntity;
}
