import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { HotelEntity } from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';
import {
  LoadHotelByIdPort,
  LoadHotelListPort,
} from 'domains/ports';
import { HotelMapper } from 'modules/adapters/mappers';
import { HotelsDbTable } from 'modules/db';
import { IHotelTableParams } from 'modules/db/interfaces';


@Injectable()
export class HotelAdapterService implements
  LoadHotelListPort,
  LoadHotelByIdPort {
  constructor(
    @Inject(HotelsDbTable) private _hotelsDbTable: HotelsDbTable,
  ) {
  }

  public async loadHotelById(params: IHotelSortingParams): Promise<HotelEntity> {
    const hotel: IHotelTableParams = await this._hotelsDbTable.findOne({
      id: params.hotelId,
      user_id: params.userId,
    });
    return hotel && HotelMapper.mapToDomain(hotel)
  }

  public async loadHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]> {
    const hotels: IHotelTableParams[] = await this._hotelsDbTable.findAll({
      city: {
        id: sortParams.cityId || ``,
      },
      id: sortParams.hotelId || ``,
      user_id: sortParams.userId || ``,
      sorting: sortParams.type || ``,
      is_favorite: sortParams.isFavorite || false,
    });
    return hotels.map((hotel: IHotelTableParams) => HotelMapper.mapToDomain(hotel));
  }
}
