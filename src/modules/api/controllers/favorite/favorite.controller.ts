import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseFilters,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JsonWebTokenExceptionFilter } from 'modules/api/filters';
import { HotelOutput } from 'modules/api/interfaces';
import { IRequest } from 'modules/api/middlewares';

import { EApiRouteName } from '../api-route-names.enum';
import { FavoriteControllerService } from './favorite-controller.service';


@ApiTags(`Favorite`)
@Controller(EApiRouteName.FAVORITE)
export class FavoriteController {
  constructor(
    private readonly _favoriteControllerService: FavoriteControllerService
  ) {}

  @Post()
  @UseFilters(JsonWebTokenExceptionFilter)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({description: `should toggle favorite status for authorized user`})
  @ApiUnauthorizedResponse({description: `should return authorization error`})
  @ApiHeader({
    name: `cookie`,
    description: `should contain access token or refresh one`,
  })
  @ApiQuery({
    name: `hotelId`,
    description: `lets to select hotel`,
    example: `023dda52-f07b-47ef-a44c-2301f8743149`
  })
  public async toggleFavoriteStatus(
    @Query(`hotelId`) hotelId: string,
    @Req() request: IRequest
  ): Promise<HotelOutput> {
    return this._favoriteControllerService.toggleFavoriteStatus(request.locals.userId, hotelId);
  }
}
