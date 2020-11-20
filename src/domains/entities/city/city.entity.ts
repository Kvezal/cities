import { LocationEntity } from 'domains/entities';

import { ICity } from './city-interface';


export class CityEntity {
  constructor(
    private readonly _id: string,
    private readonly _title: string,
    private readonly _location: LocationEntity
  ) {}

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get location(): LocationEntity {
    return this._location;
  }

  static create(params: ICity): CityEntity {
    return new CityEntity(
      params.id,
      params.title,
      params.location instanceof LocationEntity ? params.location : LocationEntity.create(params.location)
    );
  }
}
