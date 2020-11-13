import { HotelEntity } from 'domains/entities';


export interface GetNearbyHotelListQuery {
  getNearbyHotelList(hotelId: number): Promise<HotelEntity[]>;
}
