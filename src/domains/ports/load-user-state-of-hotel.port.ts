import { FavoriteEntity } from 'domains/entities';


export interface LoadUserStateOfHotelPort {
  loadUserStateOfHotel(userId: number, hotelId: number): Promise<FavoriteEntity>;
}
