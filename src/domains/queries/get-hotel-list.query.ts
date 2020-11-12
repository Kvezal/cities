import { HotelEntity } from '../entities/hotel';


export interface GetHotelListQuery {
  getHotelList(): Promise<HotelEntity[]>;
}
