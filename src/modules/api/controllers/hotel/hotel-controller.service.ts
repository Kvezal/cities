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
import { HotelOutput } from 'modules/api/interfaces';


@Injectable()
export class HotelControllerService {
  constructor(
    @Inject(hotelServiceSymbol) private readonly _hotelService: HotelService
  ) {}


  public async getHotelList(sortingParams: IHotelSortingParams): Promise<HotelOutput[]> {
    const hotelEntities: HotelEntity[] = await this._hotelService.getHotelList(sortingParams);
    return hotelEntities.map(
      (hotelEntity: HotelEntity): HotelOutput => (this.transformEntityToOutputData(hotelEntity))
    );
  }


  public async getHotelById(params: IHotelSortingParams): Promise<HotelOutput> {
    const hotelEntity: HotelEntity = await this._hotelService.getHotelById(params);
    return hotelEntity && this.transformEntityToOutputData(hotelEntity);
  }


  public transformEntityToOutputData(hotelEntity: HotelEntity): HotelOutput {
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
      city: {
        id: hotelEntity.city.id,
        title: hotelEntity.city.title,
        location: {
          id: hotelEntity.city.location.id,
          latitude: hotelEntity.city.location.latitude,
          longitude: hotelEntity.city.location.longitude,
          zoom: hotelEntity.city.location.zoom,
        },
      },
      location: {
        id: hotelEntity.location.id,
        latitude: hotelEntity.location.latitude,
        longitude: hotelEntity.location.longitude,
        zoom: hotelEntity.location.zoom,
      },
      host: {
        id: hotelEntity.host.id,
        name: hotelEntity.host.name,
        image: hotelEntity.host.image?.title,
        type: hotelEntity.host.type.title,
      },
      images: hotelEntity.images.map((image: ImageEntity) => image.title),
      isFavorite: hotelEntity.isFavorite,
    };
  }
}
