import { HotelEntity } from 'domains/entities';


export interface GetFavoriteHotelListQuery {
  getFavoriteHotelList(userId: string): Promise<HotelEntity[]>;
}
