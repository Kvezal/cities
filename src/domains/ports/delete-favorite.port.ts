import { FavoriteEntity } from 'domains/entities';


export interface DeleteFavoritePort {
  deleteFavorite(favorite: FavoriteEntity): Promise<FavoriteEntity>;
}
