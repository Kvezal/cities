import { FavoriteEntity } from 'domains/entities';


export interface SaveFavoritePort {
  saveFavorite(favorite: FavoriteEntity): Promise<FavoriteEntity>;
}
