import { FavoriteEntity } from 'domains/entities';


export interface LoadFavoritePort {
  loadFavorite(userId: string, hotelId: string): Promise<FavoriteEntity>;
}
