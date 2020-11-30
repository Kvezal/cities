import { FavoriteEntity } from 'domains/entities';


export interface DeleteUserHotelStatePort {
  deleteUserHotelState(favoriteEntity: FavoriteEntity): Promise<void>
}
