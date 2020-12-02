import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';

import { HotelOrmEntity } from 'modules/adapters';

import { EApiRouteName } from '../api-route-names.enum';
import { HotelControllerService } from './hotel-controller.service';


@Controller(EApiRouteName.HOTEL)
export class HotelController {
  constructor(
    private readonly _hotelControllerService: HotelControllerService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getHotelList(
    @Query(`cityId`) cityId: string,
    @Query(`hotelId`) hotelId: string
  ): Promise<HotelOrmEntity[]> {
    return this._hotelControllerService.getHotelList(cityId, hotelId);
  }

  @Get(`:hotelId`)
  @HttpCode(HttpStatus.OK)
  public async getHotelById(
    @Param(`hotelId`) hotelId: string
  ): Promise<HotelOrmEntity> {
    return this._hotelControllerService.getHotelById(hotelId);
  }
}
