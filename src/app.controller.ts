import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject(cityServiceSymbol) private readonly _cityService: CityService
    // @Inject(hotelServiceSymbol) private readonly _hotelService: HotelService
    // @Inject(favoriteServiceSymbol) private readonly _favoriteService: FavoriteService
    // @Inject(commentServiceSymbol) private readonly _commentService: CommentService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(`test`)
  async getCity() {
    // const commentParams = {
    //   id: `08cb567b-15ec-4e7c-bb44-123a590f9857`,
    //   text: `aaaaaaaaaaaaaaaaaaa`,
    //   createdAt: new Date(),
    //   hotelId: `fd68a25a-8095-4bfc-b686-537aa4b33204`,
    //   userId: `f0c36cc1-a787-429a-bea0-c0b537de4b33`,
    //   rating: 5,
    // };
    // const commentEntity = await this._commentService.createHotelComment(commentParams);
    // return CommentViewMapper.mapToOrmEntity(commentEntity);

    // const commentEntities = await this._commentService.getHotelCommentList({
    //   hotelId: `008184a4-15e3-42fe-9292-867e5053dfa4`,
    // });
    // console.log(commentEntities);
    // return commentEntities.map((commentEntity) => CommentViewMapper.mapToOrmEntity(commentEntity));

    // const favoriteHotelEntities = await this._favoriteService.getFavoriteHotelList(`f0c36cc1-a787-429a-bea0-c0b537de4b33`);
    // return favoriteHotelEntities.map((favoriteHotelEntity: HotelEntity) => HotelMapper.mapToOrmEntity(favoriteHotelEntity));
    // const cityEntityList = await this._cityService.getCityList();
    // return cityEntityList.map(CityMapper.mapToOrmEntity);
    // const hotelEntityList = await this._hotelService.getHotelList({
    //   cityId: `6884b665-27dd-4780-9c17-1a8667123480`
    // });
    // return hotelEntityList.map(HotelMapper.mapToOrmEntity);

    // const favoritesHotelEntities = await this._favoriteService.getFavoriteHotelList(`f0c36cc1-a787-429a-bea0-c0b537de4b33`);
    // return favoritesHotelEntities.map((favoritesHotelEntity: HotelEntity) => HotelMapper.mapToOrmEntity(favoritesHotelEntity));
  }
}
