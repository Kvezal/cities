import { RatingEntity } from 'domains/entities';


export interface IHotelCommentParams {
  id: string;
  text: string;
  createdAt: Date;
  rating: number | RatingEntity;
  hotelId: string;
  userId: string;
}
