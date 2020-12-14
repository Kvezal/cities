import {
  Inject,
  Injectable,
} from '@nestjs/common';

import {
  FeatureEntity,
  HotelEntity,
  ImageEntity,
} from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';
import {
  HotelService,
  hotelServiceSymbol,
} from 'domains/services';
import {
  CityMapper,
  LocationMapper,
} from 'modules/adapters';
import { HotelOut } from 'modules/api/interfaces';


@Injectable()
export class HotelControllerService {
  constructor(
    @Inject(hotelServiceSymbol) private readonly _hotelService: HotelService
  ) {}


  public async getHotelList(sortingParams: IHotelSortingParams): Promise<HotelOut[]> {
    const hotelEntities: HotelEntity[] = await this._hotelService.getHotelList(sortingParams);
    return hotelEntities.map(
      (hotelEntity: HotelEntity): HotelOut => (this.transformEntityToOutputData(hotelEntity, sortingParams.userId))
    );
  }


  public async getHotelById(hotelId: string): Promise<HotelOut> {
    const hotelEntity: HotelEntity = await this._hotelService.getHotelById(hotelId);
    return hotelEntity && this.transformEntityToOutputData(hotelEntity);
  }


  public transformEntityToOutputData(hotelEntity: HotelEntity, userId: string = null): HotelOut {
    return {
      id: hotelEntity.id,
      title: hotelEntity.title,
      description: hotelEntity.description,
      bedroomCount: hotelEntity.bedroomCount,
      maxAdultCount: hotelEntity.maxAdultCount,
      price: hotelEntity.price,
      isPremium: hotelEntity.isPremium,
      rating: hotelEntity.rating,
      features: hotelEntity.features.map((feature: FeatureEntity) => feature.title),
      type: hotelEntity.type.title,
      city: CityMapper.mapToOrmEntity(hotelEntity.city),
      location: LocationMapper.mapToOrmEntity(hotelEntity.location),
      host: {
        id: hotelEntity.host.id,
        name: hotelEntity.host.name,
        image: hotelEntity.host.image.title,
        type: hotelEntity.host.type.title,
      },
      images: hotelEntity.images.map((image: ImageEntity) => image.title),
      isFavorite: hotelEntity.isFavorite(userId),
    };
  }
}
