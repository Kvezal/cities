import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';

import { HotelOrmEntity } from 'modules/adapters';
import { JsonWebTokenExceptionFilter } from 'modules/api/filters';

import { EApiRouteName } from '../api-route-names.enum';
import { FavoriteControllerService } from './favorite-controller.service';


@Controller(EApiRouteName.FAVORITE)
export class FavoriteController {
  constructor(
    private readonly _favoriteControllerService: FavoriteControllerService
  ) {}

  @Post()
  @UseFilters(JsonWebTokenExceptionFilter)
  @HttpCode(HttpStatus.OK)
  public async toggleFavoriteStatus(@Query(`hotelId`) hotelId: string, @Req() request: Request): Promise<HotelOrmEntity> {
    const accessToken = request.cookies?.[`access-token`];
    return this._favoriteControllerService.toggleFavoriteStatus(hotelId, accessToken);
  }
}
