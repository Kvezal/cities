import { HotelEntity } from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';
import { LoadHotelByIdPort, LoadHotelListPort } from 'domains/ports';
import { GetHotelByIdQuery, GetHotelListQuery } from 'domains/queries';
import { ESortingFilter } from 'domains/interfaces/hotel-sorting.interface';


export class HotelService implements
  GetHotelListQuery,
  GetHotelByIdQuery {
  constructor(
    private readonly _hotelListLoaderService: LoadHotelListPort,
    private readonly _hotelLoaderService: LoadHotelByIdPort
  ) {}

  public async getHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]> {
    if (sortParams.filter !== ESortingFilter.NEARBY) {
      return this._hotelListLoaderService.loadHotelList(sortParams);
    }
    const hotelEntity = await this.getHotelById(sortParams.hotelId);
    if (!hotelEntity) {
      return;
    }
    const hotelEntityList = await this._hotelListLoaderService.loadHotelList({
      ...sortParams,
      cityId: hotelEntity.city.id,
    });
    return hotelEntity.getNearbyHotelList(hotelEntityList);
  }

  public async getHotelById(hotelId: string): Promise<HotelEntity> {
    return this._hotelLoaderService.loadHotelById(hotelId);
  }
}
