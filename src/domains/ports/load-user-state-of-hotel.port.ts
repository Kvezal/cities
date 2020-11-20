import { FavoriteEntity } from 'domains/entities';


export interface LoadUserStateOfHotelPort {
  loadUserStateOfHotel(userId: string, hotelId: string): Promise<FavoriteEntity>;
}
