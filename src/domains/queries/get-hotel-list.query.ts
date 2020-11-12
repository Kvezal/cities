import { HotelEntity } from '../entities';
import { IHotelSortingParams } from '../interfaces';


export interface GetHotelListQuery {
  getHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]>;
}
