import { HotelEntity } from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';


export interface LoadHotelListPort {
  loadHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]>;
}
