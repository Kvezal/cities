import { RatingEntity } from 'domains/entities';


export interface UpdateRatingPort {
  updateRating(entity: RatingEntity): Promise<RatingEntity>;
}
