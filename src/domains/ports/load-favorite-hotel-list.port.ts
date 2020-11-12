import { HotelEntity } from '../entities';


export interface LoadFavoriteHotelListPort {
  loadFavoriteHotelList(userId: number): Promise<HotelEntity[]>;
}
