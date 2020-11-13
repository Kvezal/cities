import { HotelEntity } from '../entities';


export interface GetFavoriteHotelListQuery {
  getFavoriteHotelList(userId: number): Promise<HotelEntity[]>;
}
