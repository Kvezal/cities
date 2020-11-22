import { RatingEntity } from 'domains/entities';


export interface LoadRatingPort {
  loadRating(userId: string, hotelId: string): Promise<RatingEntity>;
}
