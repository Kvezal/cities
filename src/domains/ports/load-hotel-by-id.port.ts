import { HotelEntity } from 'domains/entities';


export interface LoadHotelByIdPort {
  loadHotelById(hotelId: string): Promise<HotelEntity>;
}
