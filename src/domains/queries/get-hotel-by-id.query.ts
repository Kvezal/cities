import { HotelEntity } from '../entities';


export interface GetHotelByIdQuery {
  getHotelById(hotelId: number): Promise<HotelEntity>;
}
