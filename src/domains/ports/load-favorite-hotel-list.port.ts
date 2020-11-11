import { HotelEntity } from '../entities/hotel';


export interface LoadFavoriteHotelListPort {
  loadFavoriteHotelList(userId: number): HotelEntity[];
}
