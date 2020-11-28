import { RatingEntity } from 'domains/entities';


export interface CheckRatingPort {
  checkRating(entity: RatingEntity): Promise<boolean>;
}
