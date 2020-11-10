import { City } from '../city';
import { Feature } from '../feature';
import { HotelType } from '../hotel-type';
import { Image } from '../image';
import { Location } from '../location';
import { User } from '../user';
import { IHotel } from './hotel.interface';


export class Hotel {
  constructor(
    private readonly _id: number,
    private readonly _title: string,
    private readonly _description: string,
    private readonly _bedroomCount: number,
    private readonly _maxAdultCount: number,
    private readonly _price: number,
    private readonly _isPremium: boolean,
    private readonly _rating: number,
    private readonly _features: Feature[],
    private readonly _type: HotelType,
    private readonly _city: City,
    private readonly _location: Location,
    private readonly _host: User,
    private readonly _images: Image[]
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

  get features(): Feature[] {
    return this._features;
  }

  get type(): HotelType {
    return this._type;
  }

  get city(): City {
    return this._city;
  }

  get location(): Location {
    return this._location;
  }

  get host(): User {
    return this._host;
  }

  get images(): Image[] {
    return this._images;
  }

  static create(params: IHotel): Hotel {
    return new Hotel(
      params.id,
      params.title,
      params.description,
      params.bedroomCount,
      params.maxAdultCount,
      params.price,
      params.isPremium,
      params.rating,
      params.features.map(Feature.create),
      HotelType.create(params.type),
      City.create(params.city),
      Location.create(params.location),
      User.create(params.host),
      params.images.map(Image.create),
    )
  }
}
