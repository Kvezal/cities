import { HotelEntity } from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';
import { LoadHotelByIdPort, LoadHotelListPort } from 'domains/ports';
import { GetHotelByIdQuery, GetHotelListQuery, GetNearbyHotelListQuery } from 'domains/queries';


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

  public async getHotelById(hotelId: string): Promise<HotelEntity> {
    return this._hotelLoaderService.loadHotelById(hotelId);
  }

  public async getNearbyHotelList(hotelId: string): Promise<HotelEntity[]> {
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
