import {
  CityEntity,
  FeatureEntity,
  HotelTypeEntity,
  IFeature,
  IImage,
  ImageEntity,
  LocationEntity,
  UserEntity,
} from 'domains/entities';

import { IHotel } from './hotel.interface';


export class HotelEntity {
  constructor(
    private readonly _id: string,
    private readonly _title: string,
    private readonly _description: string,
    private readonly _bedroomCount: number,
    private readonly _maxAdultCount: number,
    private readonly _price: number,
    private readonly _isPremium: boolean,
    private readonly _rating: number,
    private readonly _features: FeatureEntity[],
    private readonly _type: HotelTypeEntity,
    private readonly _city: CityEntity,
    private readonly _location: LocationEntity,
    private readonly _host: UserEntity,
    private readonly _images: ImageEntity[],
    private readonly _isFavorite: boolean,
  ) {}

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get bedroomCount(): number {
    return this._bedroomCount;
  }

  get maxAdultCount(): number {
    return this._maxAdultCount;
  }

  get price(): number {
    return this._price;
  }

  get isPremium(): boolean {
    return this._isPremium;
  }

  get rating(): number {
    return this._rating;
  }

  get features(): FeatureEntity[] {
    return this._features;
  }

  get type(): HotelTypeEntity {
    return this._type;
  }

  get city(): CityEntity {
    return this._city;
  }

  get location(): LocationEntity {
    return this._location;
  }

  get host(): UserEntity {
    return this._host;
  }

  get images(): ImageEntity[] {
    return this._images;
  }

  get isFavorite(): boolean {
    return this._isFavorite;
  }

  static create(params: IHotel): HotelEntity {
    const features = params.features.map(
      (feature: IFeature | FeatureEntity) => feature instanceof FeatureEntity ? feature : FeatureEntity.create(feature)
    );
    const images = params.images.map(
      (image: IImage | ImageEntity) => image instanceof ImageEntity ? image : ImageEntity.create(image)
    );

    return new HotelEntity(
      params.id,
      params.title,
      params.description,
      params.bedroomCount,
      params.maxAdultCount,
      params.price,
      params.isPremium,
      params.rating,
      features,
      params.type instanceof HotelTypeEntity ? params.type : HotelTypeEntity.create(params.type),
      params.city instanceof CityEntity ? params.city : CityEntity.create(params.city),
      params.location instanceof LocationEntity ? params.location : LocationEntity.create(params.location),
      params.host instanceof UserEntity ? params.host : UserEntity.create(params.host),
      images,
      params.isFavorite,
    )
  }
}
