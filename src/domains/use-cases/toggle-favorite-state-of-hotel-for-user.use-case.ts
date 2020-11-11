import { FavoriteEntity } from '../entities/favorite';

export interface ToggleFavoriteStateOfHotelForUserUseCase {
  toggleFavoriteStateOfHotelForUser(userId: number, hotelId: number): FavoriteEntity;
}
