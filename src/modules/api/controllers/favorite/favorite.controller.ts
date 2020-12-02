import { Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseFilters } from '@nestjs/common';
import { Request } from 'express';

import { EApiRouteName } from '../api-route-names.enum';
import { FavoriteOrmEntity, HotelOrmEntity } from 'modules/adapters';
import { JsonWebTokenExceptionFilter } from 'modules/api/filters';
import { FavoriteControllerService } from 'modules/api/controllers/favorite/favorite-controller.service';

@Controller(EApiRouteName.FAVORITE)
export class FavoriteController {
  constructor(
    private readonly _favoriteControllerService: FavoriteControllerService
  ) {}

  @Get()
  @UseFilters(JsonWebTokenExceptionFilter)
  @HttpCode(HttpStatus.OK)
  public async getFavoriteHotelList(@Req() request: Request): Promise<HotelOrmEntity[]> {
    const accessToken = request.cookies?.[`access-token`];
    return this._favoriteControllerService.getFavoriteHotelList(accessToken);
  }

  @Post()
  @UseFilters(JsonWebTokenExceptionFilter)
  @HttpCode(HttpStatus.OK)
  public async toggleFavoriteStatus(@Query(`hotelId`) hotelId: string, @Req() request: Request): Promise<FavoriteOrmEntity> {
    const accessToken = request.cookies?.[`access-token`];
    return this._favoriteControllerService.toggleFavoriteStatus(hotelId, accessToken);
  }
}
