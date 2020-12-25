import { FavoriteEntity } from 'domains/entities';


export interface ToggleFavoriteUseCase {
  toggleFavorite(userId: string, hotelId: string): Promise<FavoriteEntity>;
}
