import { HotelEntity } from '../../entities';
import { LoadHotelListPort } from '../../ports';
import { GetHotelListQuery } from '../../queries';


export class HotelService implements GetHotelListQuery {
  constructor(
    private readonly _hotelLoaderService: LoadHotelListPort
  ) {}

  public getHotelList(): HotelEntity[] {
    return  this._hotelLoaderService.loadHotelList();
  }
}
