import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  CityService,
  cityServiceSymbol,
  FavoriteService,
  favoriteServiceSymbol,
  HotelService,
  hotelServiceSymbol,
} from 'domains/services';
import { HotelMapper } from 'modules/mappers';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject(cityServiceSymbol) private readonly _cityService: CityService,
    // @Inject(hotelServiceSymbol) private readonly _hotelService: HotelService
    @Inject(favoriteServiceSymbol) private readonly _favoriteService: FavoriteService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(`test`)
  async getCity() {
    await this._favoriteService.toggleFavoriteStateOfHotelForUser(`239e3a9c-75f7-44ea-9e1a-b6a81310793f`, `2037c09e-c6b1-4a89-b9b9-a6bfab934fd7`);
    // const cityEntityList = await this._cityService.getCityList();
    // return cityEntityList.map(CityMapper.mapToOrmEntity);
    // const hotelEntityList = await this._hotelService.getHotelList({
    //   cityId: `b0f5276a-467b-4e79-9c98-a65ba0336967`
    // });
    // return hotelEntityList.map(HotelMapper.mapToOrmEntity);
  }
}
