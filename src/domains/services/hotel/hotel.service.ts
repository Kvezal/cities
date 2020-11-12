import { HotelEntity } from '../../entities';
import { LoadHotelListPort } from '../../ports';
import { GetHotelListQuery } from '../../queries';


export class HotelService implements GetHotelListQuery {
  constructor(
    private readonly _hotelLoaderService: LoadHotelListPort
  ) {}

  public async getHotelList(): Promise<HotelEntity[]> {
    return await this._hotelLoaderService.loadHotelList();
  }
}
