import { HotelEntity } from 'domains/entities';


export interface GetFavoriteHotelListQuery {
  getFavoriteHotelList(userId: number): Promise<HotelEntity[]>;
}
