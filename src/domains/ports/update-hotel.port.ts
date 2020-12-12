import { HotelEntity } from 'domains/entities';


export interface UpdateHotelPort {
  updateHotel(hotelEntity: HotelEntity): Promise<HotelEntity>;
}