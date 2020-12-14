import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CityOutput } from 'modules/api/interfaces';

import { EApiRouteName } from '../api-route-names.enum';
import { CityControllerService } from './city-controller.service';


@ApiTags(`City`)
@Controller(EApiRouteName.CITY)
export class CityController {
  constructor(private readonly _cityControllerService: CityControllerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: `return city list`,
    type: CityOutput,
    isArray: true
  })
  public async getList(): Promise<CityOutput[]> {
    return this._cityControllerService.getCityList();
  }
}
