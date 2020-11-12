import { HotelEntity } from '../entities';
import { IHotelSortingParams } from '../interfaces';


export interface LoadHotelListPort {
  loadHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]>;
}
