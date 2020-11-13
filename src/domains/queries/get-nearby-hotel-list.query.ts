import { HotelEntity } from '../entities';


export interface GetNearbyHotelListQuery {
  getNearbyHotelList(hotelId: number): Promise<HotelEntity[]>;
}
