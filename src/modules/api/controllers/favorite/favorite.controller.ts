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
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiHeader,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JsonWebTokenExceptionFilter } from 'modules/api/filters';
import { FavoriteOutput } from 'modules/api/interfaces';
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
  @ApiCookieAuth(`accessToken`)
  @ApiOkResponse({
    description: `should toggle favorite status for authorized user`,
    type: FavoriteOutput,
  })
  @ApiUnauthorizedResponse({description: `should return authorization error`})
  @ApiBadRequestResponse({description: `should return bad request if parameters are invalid`})
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
  ): Promise<FavoriteOutput> {
    return this._favoriteControllerService.toggleFavoriteStatus(request.locals.userId, hotelId);
  }
}
