import { HotelEntity } from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';


export interface LoadHotelByIdPort {
  loadHotelById(params: IHotelSortingParams): Promise<HotelEntity>;
}
