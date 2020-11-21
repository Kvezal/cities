import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject(cityServiceSymbol) private readonly _cityService: CityService,
    // @Inject(hotelServiceSymbol) private readonly _hotelService: HotelService
    // @Inject(favoriteServiceSymbol) private readonly _favoriteService: FavoriteService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(`test`)
  async getCity() {
    // await this._favoriteService.getFavoriteHotelList(`232d6b86-070c-48f9-9fbb-5805cd54cdd5`);
    // const cityEntityList = await this._cityService.getCityList();
    // return cityEntityList.map(CityMapper.mapToOrmEntity);
    // const hotelEntityList = await this._hotelService.getHotelList({
    //   cityId: `b0f5276a-467b-4e79-9c98-a65ba0336967`
    // });
    // return hotelEntityList.map(HotelMapper.mapToOrmEntity);
  }
}
