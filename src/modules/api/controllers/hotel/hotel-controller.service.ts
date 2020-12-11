import { Inject, Injectable } from '@nestjs/common';

import { HotelService, hotelServiceSymbol } from 'domains/services';
import { HotelMapper, HotelOrmEntity } from 'modules/adapters';
import { HotelEntity } from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';


@Injectable()
export class HotelControllerService {
  constructor(
    @Inject(hotelServiceSymbol) private readonly _hotelService: HotelService
  ) {}


  public async getHotelList(sortingParams: IHotelSortingParams): Promise<HotelOrmEntity[]> {
    const hotelEntities: HotelOrmEntity[] = await this._hotelService.getHotelList(sortingParams);
    return hotelEntities.map((hotelEntity: HotelEntity) => HotelMapper.mapToOrmEntity(hotelEntity));
  }


  public async getHotelById(hotelId: string): Promise<HotelOrmEntity> {
    const hotelEntity: HotelEntity = await this._hotelService.getHotelById(hotelId);
    return hotelEntity && HotelMapper.mapToOrmEntity(hotelEntity);
  }
}
