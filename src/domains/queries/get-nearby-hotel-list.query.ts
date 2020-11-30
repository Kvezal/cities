import { HotelEntity } from 'domains/entities';


export interface GetNearbyHotelListQuery {
  getNearbyHotelList(hotelId: string): Promise<HotelEntity[]>;
}
