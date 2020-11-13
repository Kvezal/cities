import { RatingEntity } from '../entities';


export interface IHotelCommentParams {
  id: number;
  text: string;
  date: Date;
  rating: number | RatingEntity;
  hotelId: number;
  userId: number;
}
