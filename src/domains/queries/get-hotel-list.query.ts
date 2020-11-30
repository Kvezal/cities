import { HotelEntity } from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';


export interface GetHotelListQuery {
  getHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]>;
}
