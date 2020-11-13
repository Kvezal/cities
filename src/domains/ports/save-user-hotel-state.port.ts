import { FavoriteEntity } from 'domains/entities';


export interface SaveUserHotelStatePort {
  saveUserHotelState(favoriteEntity: FavoriteEntity): Promise<FavoriteEntity>;
}
