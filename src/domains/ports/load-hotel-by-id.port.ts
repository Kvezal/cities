import { HotelEntity } from 'domains/entities';


export interface LoadHotelByIdPort {
  loadHotelById(hotelId: number): Promise<HotelEntity>;
}
