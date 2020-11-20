import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HotelEntity } from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';
import { LoadHotelByIdPort, LoadHotelListPort } from 'domains/ports';
import { HotelOrmEntity } from 'modules/orm-entities';
import { HotelMapper } from 'modules/mappers';


@Injectable()
export class HotelAdapterService implements LoadHotelListPort, LoadHotelByIdPort {
  constructor(
    @InjectRepository(HotelOrmEntity) private readonly _hotelRepository: Repository<HotelOrmEntity>
  ) {}

  public async loadHotelById(id: string): Promise<HotelEntity> {
    const hotelOrmEntity: HotelOrmEntity = await this._hotelRepository.findOne(id);
    return HotelMapper.mapToDomain(hotelOrmEntity);
  }

  public async loadHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]> {
    const hotelOrmEntityList: HotelOrmEntity[] = await this._hotelRepository.find({
      where: {
        city: {
          id: sortParams.cityId
        }
    }});
    return hotelOrmEntityList.map((hotelOrmEntity: HotelOrmEntity) => HotelMapper.mapToDomain(hotelOrmEntity));
  }
}
