import { Inject, Injectable } from '@nestjs/common';

import { HotelService, hotelServiceSymbol } from 'domains/services';
import { HotelMapper, HotelOrmEntity } from 'modules/adapters';
import { HotelEntity } from 'domains/entities';


@Injectable()
export class HotelControllerService {
  constructor(
    @Inject(hotelServiceSymbol) private readonly _hotelService: HotelService
  ) {}


  public async getHotelList(cityId: string, hotelId: string): Promise<HotelOrmEntity[]> {
    let hotelEntities: HotelOrmEntity[] = [];
    if (cityId) {
      hotelEntities = await this._hotelService.getHotelList({cityId});
    }
    if (hotelId) {
      hotelEntities = await this._hotelService.getNearbyHotelList(hotelId);
    }
    return hotelEntities.map((hotelEntity: HotelEntity) => HotelMapper.mapToOrmEntity(hotelEntity));
  }


  public async getHotelById(hotelId: string): Promise<HotelOrmEntity> {
    const hotelEntity: HotelEntity = await this._hotelService.getHotelById(hotelId);
    return hotelEntity && HotelMapper.mapToOrmEntity(hotelEntity);
  }
}
