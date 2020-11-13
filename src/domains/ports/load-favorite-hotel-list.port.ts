import { HotelEntity } from 'domains/entities';


export interface LoadFavoriteHotelListPort {
  loadFavoriteHotelList(userId: number): Promise<HotelEntity[]>;
}
