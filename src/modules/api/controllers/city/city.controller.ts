import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { CityOrmEntity } from 'modules/adapters';

import { EApiRouteName } from '../api-route-names.enum';
import { CityControllerService } from './city-controller.service';


@Controller(EApiRouteName.CITY)
export class CityController {
  constructor(private readonly _cityControllerService: CityControllerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getList(): Promise<CityOrmEntity[]> {
    return await this._cityControllerService.getCityList();
  }
}
