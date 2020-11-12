import { CityEntity } from '../city';
import { FeatureEntity } from '../feature';
import { HotelTypeEntity } from '../hotel-type';
import { ImageEntity } from '../image';
import { LocationEntity } from '../location';
import { UserEntity } from '../user';
import { IHotel } from './hotel.interface';


export class HotelEntity {
  constructor(
    private readonly _id: number,
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
    private readonly _images: ImageEntity[]
  ) {}

  get id(): number {
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

  static create(params: IHotel): HotelEntity {
    return new HotelEntity(
      params.id,
      params.title,
      params.description,
      params.bedroomCount,
      params.maxAdultCount,
      params.price,
      params.isPremium,
      params.rating,
      params.features.map(FeatureEntity.create),
      HotelTypeEntity.create(params.type),
      CityEntity.create(params.city),
      LocationEntity.create(params.location),
      UserEntity.create(params.host),
      params.images.map(ImageEntity.create),
    )
  }

  public getNearbyHotelList(hotels: HotelEntity[]): HotelEntity[] {
    const NEARBY_HOTEL_LIMIT = 3;
    return hotels
      .filter((hotel) => this.location.id !== hotel.location.id)
      .sort((left: HotelEntity, right: HotelEntity): number => {
        const leftDistance = this.location.calculateDistance(left.location);
        const rightDistance = this.location.calculateDistance(right.location);
        return leftDistance - rightDistance;
      })
      .slice(0, NEARBY_HOTEL_LIMIT);
  }
}
