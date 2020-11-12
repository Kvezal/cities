import { HotelEntity } from '../../entities';
import { LoadHotelByIdPort, LoadHotelListPort } from '../../ports';
import { GetHotelByIdQuery, GetHotelListQuery, GetNearbyHotelListQuery } from '../../queries';


export class HotelService implements
  GetHotelListQuery,
  GetHotelByIdQuery,
  GetNearbyHotelListQuery {
  constructor(
    private readonly _hotelListLoaderService: LoadHotelListPort,
    private readonly _hotelLoaderService: LoadHotelByIdPort
  ) {}

  public async getHotelList(): Promise<HotelEntity[]> {
    return this._hotelListLoaderService.loadHotelList();
  }

  public async getHotelById(hotelId: number): Promise<HotelEntity> {
    return this._hotelLoaderService.loadHotelById(hotelId);
  }

  public async getNearbyHotelList(hotelId: number): Promise<HotelEntity[]> {
    const hotelEntity = await this.getHotelById(hotelId);
    if (!hotelEntity) {
      return;
    }
    const hotelEntityList = await this.getHotelList();
    return hotelEntity.getNearbyHotelList(hotelEntityList);
  }
}
