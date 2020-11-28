export interface CheckRatingPort {
  checkRating(userId: string, hotelId: string): Promise<boolean>;
}
