import { HotelEntity } from '../entities/hotel';


export interface GetHotelListQuery {
  getHotelList(): HotelEntity[]
}
