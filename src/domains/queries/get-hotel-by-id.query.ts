import { HotelEntity } from 'domains/entities';


export interface GetHotelByIdQuery {
  getHotelById(hotelId: number): Promise<HotelEntity>;
}
