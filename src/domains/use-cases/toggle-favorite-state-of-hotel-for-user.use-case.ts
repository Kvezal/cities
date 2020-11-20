import { FavoriteEntity } from 'domains/entities';


export interface ToggleFavoriteStateOfHotelForUserUseCase {
  toggleFavoriteStateOfHotelForUser(userId: string, hotelId: string): Promise<FavoriteEntity>;
}
