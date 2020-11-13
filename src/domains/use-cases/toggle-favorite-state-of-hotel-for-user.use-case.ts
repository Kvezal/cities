import { FavoriteEntity } from '../entities';


export interface ToggleFavoriteStateOfHotelForUserUseCase {
  toggleFavoriteStateOfHotelForUser(userId: number, hotelId: number): Promise<FavoriteEntity>;
}
