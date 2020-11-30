import { HotelEntity } from 'domains/entities';


export interface LoadFavoriteHotelListPort {
  loadFavoriteHotelList(userId: string): Promise<HotelEntity[]>;
}
