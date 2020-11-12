import { FavoriteEntity } from '../entities';


export interface LoadUserStateOfHotelPort {
  loadUserStateOfHotel(userId: number, hotelId: number): Promise<FavoriteEntity>;
}
