import { HotelEntity } from 'domains/entities';


export interface ToggleHotelFavoriteStateUseCase {
  toggleHotelFavoriteState(userId: string, hotelId: string): Promise<HotelEntity>;
}
