import { FavoriteEntity } from 'domains/entities';


export interface ToggleHotelFavoriteStateUseCase {
  toggleHotelFavoriteState(userId: string, hotelId: string): Promise<FavoriteEntity>;
}
