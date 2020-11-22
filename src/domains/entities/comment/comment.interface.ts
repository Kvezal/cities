import { HotelEntity, IHotel, IRating, IUser, RatingEntity, UserEntity } from 'domains/entities';


export interface IComment {
  id: string;
  text: string;
  createdAt: Date;
  rating: IRating | RatingEntity;
  hotel: IHotel | HotelEntity;
  user: IUser | UserEntity;
}
