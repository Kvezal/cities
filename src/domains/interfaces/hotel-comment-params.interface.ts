import { IRating, RatingEntity } from 'domains/entities';


export interface IHotelCommentParams {
  id: string;
  text: string;
  createdAt: Date;
  rating: IRating | RatingEntity;
  hotelId: string;
  userId: string;
}
