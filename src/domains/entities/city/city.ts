import {Location} from '../location';
import { ICity } from './city-interface';


export class City {
  constructor(
    private readonly _id: number,
    private readonly _title: string,
    private readonly _location: Location
  ) {}

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get location(): Location {
    return this._location;
  }

  static create(params: ICity): City {
    return new City(
      params.id,
      params.title,
      Location.create(params.location)
    );
  }
}
