import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Req,
} from '@nestjs/common';

import {
  ESortingFilter,
  ESortingType,
} from 'domains/interfaces';

import { EApiRouteName } from '../api-route-names.enum';
import { IHotelOut } from './hotel.interface';
import { HotelControllerService } from './hotel-controller.service';
import { IRequest } from 'modules/api/middlewares';


@Controller(EApiRouteName.HOTEL)
export class HotelController {
  constructor(
    private readonly _hotelControllerService: HotelControllerService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getHotelList(
    @Query(`cityId`) cityId: string,
    @Query(`hotelId`) hotelId: string,
    @Query(`filter`) filter: ESortingFilter,
    @Query(`type`) type: ESortingType,
    @Req() request: IRequest
  ): Promise<IHotelOut[]> {
    return this._hotelControllerService.getHotelList({
      cityId,
      hotelId,
      userId: request?.locals?.userId,
      type,
      filter,
    });
  }

  @Get(`:hotelId`)
  @HttpCode(HttpStatus.OK)
  public async getHotelById(
    @Param(`hotelId`) hotelId: string
  ): Promise<IHotelOut> {
    return this._hotelControllerService.getHotelById(hotelId);
  }
}
