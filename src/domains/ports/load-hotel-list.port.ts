import { HotelEntity } from '../entities/hotel';


export interface LoadHotelListPort {
  loadHotelList(): HotelEntity[];
}
