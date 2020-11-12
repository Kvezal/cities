import { HotelEntity } from '../entities';


export interface LoadHotelByIdPort {
  loadHotelById(hotelId: number): Promise<HotelEntity>;
}
