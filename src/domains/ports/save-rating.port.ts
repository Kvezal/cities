import { RatingEntity } from 'domains/entities';


export interface SaveRatingPort {
  saveRating(entity: RatingEntity): Promise<RatingEntity>;
}
