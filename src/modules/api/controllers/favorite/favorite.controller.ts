import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseFilters,
} from '@nestjs/common';

import { HotelOrmEntity } from 'modules/adapters';
import { JsonWebTokenExceptionFilter } from 'modules/api/filters';
import { IRequest } from 'modules/api/middlewares';

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
  public async toggleFavoriteStatus(
    @Query(`hotelId`) hotelId: string,
    @Req() request: IRequest
  ): Promise<HotelOrmEntity> {
    return this._favoriteControllerService.toggleFavoriteStatus(request.locals.userId, hotelId);
  }
}
