import { HotelEntity } from '../../entities';
import { IHotelSortingParams } from '../../interfaces';
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

  public async getHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]> {
    return this._hotelListLoaderService.loadHotelList(sortParams);
  }

  public async getHotelById(hotelId: number): Promise<HotelEntity> {
    return this._hotelLoaderService.loadHotelById(hotelId);
  }

  public async getNearbyHotelList(hotelId: number): Promise<HotelEntity[]> {
    const hotelEntity = await this.getHotelById(hotelId);
    if (!hotelEntity) {
      return;
    }
    const hotelEntityList = await this.getHotelList({
      cityId: hotelEntity.city.id,
    });
    return hotelEntity.getNearbyHotelList(hotelEntityList);
  }
}
