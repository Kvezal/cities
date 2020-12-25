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
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ESortingType } from 'domains/interfaces';

import { HotelOutput } from 'modules/api/interfaces';
import { IRequest } from 'modules/api/middlewares';

import { EApiRouteName } from '../api-route-names.enum';
import { HotelControllerService } from './hotel-controller.service';


@ApiTags(`Hotel`)
@Controller(EApiRouteName.HOTEL)
export class HotelController {
  constructor(
    private readonly _hotelControllerService: HotelControllerService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: `return hotel list`,
    type: HotelOutput,
    isArray: true,
  })
  @ApiQuery({
    name: `cityId`,
    description: `lets to get hotel in the city with id`,
    example: `023dda52-f07b-47ef-a44c-2301f8743149`,
    required: false,
  })
  @ApiQuery({
    name: `hotelId`,
    description: `lets to get hotel with id (depends of filter)`,
    example: `023dda52-f07b-47ef-a44c-2301f8743149`,
    required: false,
  })
  @ApiQuery({
    name: `isFavorite`,
    description: `lets filter user favorite hotels`,
    example: true,
    required: false,
  })
  @ApiQuery({
    name: `sorting`,
    description: `lets filter hotels by sorting type`,
    example: ESortingType.POPULAR,
    enum: ESortingType,
    required: false,
  })
  public async getHotelList(
    @Query(`cityId`) cityId: string,
    @Query(`hotelId`) hotelId: string,
    @Query(`isFavorite`) isFavorite: boolean,
    @Query(`sorting`) type: ESortingType,
    @Req() request: IRequest
  ): Promise<HotelOutput[]> {
    return this._hotelControllerService.getHotelList({
      cityId,
      hotelId,
      userId: request?.locals?.userId,
      type,
      isFavorite,
    });
  }

  @Get(`:hotelId`)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: `return hotel by id`,
    type: HotelOutput,
  })
  @ApiParam({
    name: `hotelId`,
    description: `lets to get hotel by id`,
  })
  public async getHotelById(
    @Param(`hotelId`) hotelId: string
  ): Promise<HotelOutput> {
    return this._hotelControllerService.getHotelById(hotelId);
  }
}
