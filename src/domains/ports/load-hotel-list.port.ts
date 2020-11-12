import { HotelEntity } from '../entities/hotel';


export interface LoadHotelListPort {
  loadHotelList(): Promise<HotelEntity[]>;
}
