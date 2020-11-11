import { HotelEntity } from '../entities/hotel';


export interface GetFavoriteHotelListQuery {
  getFavoriteHotelList(userId: number): HotelEntity[];
}
