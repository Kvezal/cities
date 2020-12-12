import { NEARBY_HOTEL_LIMIT } from 'domains/constants';
import {
  CityEntity,
  FeatureEntity,
  HotelTypeEntity,
  IFeature,
  IImage,
  ImageEntity,
  IUser,
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
    private readonly _favorites: UserEntity[],
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

  get favorites(): UserEntity[] {
    return this._favorites;
  }

  static create(params: IHotel): HotelEntity {
    const features = params.features.map(
      (feature: IFeature | FeatureEntity) => feature instanceof FeatureEntity ? feature : FeatureEntity.create(feature)
    );
    const images = params.images.map(
      (image: IImage | ImageEntity) => image instanceof ImageEntity ? image : ImageEntity.create(image)
    );
    const favorites = params.favorites.map(
      (user: IUser | UserEntity) => user instanceof UserEntity ? user : UserEntity.create(user)
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
      favorites,
    )
  }

  public getNearbyHotelList(hotels: HotelEntity[]): HotelEntity[] {
    return hotels
      .filter((hotel) => this.location.id !== hotel.location.id)
      .sort((left: HotelEntity, right: HotelEntity): number => {
        const leftDistance = this.location.calculateDistance(left.location);
        const rightDistance = this.location.calculateDistance(right.location);
        return leftDistance - rightDistance;
      })
      .slice(0, NEARBY_HOTEL_LIMIT);
  }

  public toggleFavorite(userEntity: UserEntity): void {
    const favoriteIndex = this._favorites.findIndex((favorite: UserEntity) => favorite.id === userEntity.id);
    if (favoriteIndex === -1) {
      this._favorites.push(userEntity);
      return;
    }
    this._favorites.splice(favoriteIndex, 1);
  }
}
