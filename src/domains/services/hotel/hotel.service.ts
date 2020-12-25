import { HotelEntity } from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';
import {
  LoadHotelByIdPort,
  LoadHotelListPort,
  LoadUserByIdPort,
} from 'domains/ports';
import { GetHotelListQuery } from 'domains/queries';
import {
  EHotelField,
  HotelException,
} from 'domains/exceptions/hotel';


export class HotelService implements GetHotelListQuery {
  constructor(
    private readonly _hotelListLoaderService: LoadHotelListPort,
    private readonly _hotelLoaderService: LoadHotelByIdPort,
    private readonly _userLoaderService: LoadUserByIdPort,
  ) {
  }

  public async getHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]> {
    return this._hotelListLoaderService.loadHotelList(sortParams);
  }

  public async getHotelById(hotelId: string): Promise<HotelEntity> {
    const hotelEntity: HotelEntity = await this._hotelLoaderService.loadHotelById(hotelId);
    if (!hotelEntity) {
      throw new HotelException({
        field: EHotelField.ID,
        message: `Hotel with ${hotelId} id doesn't exist`,
      })
    }
    return hotelEntity;
  }
}
