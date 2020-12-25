import { ILocation } from './location.interface';


export class LocationEntity {
  constructor(
    private readonly _id: string,
    private readonly _latitude: number,
    private readonly _longitude: number,
    private readonly _zoom: number,
  ) {}

  get id(): string {
    return this._id;
  }

  get latitude(): number {
    return this._latitude;
  }

  get longitude(): number {
    return this._longitude;
  }

  get zoom(): number {
    return this._zoom;
  }

  static create(params: ILocation): LocationEntity {
    return new LocationEntity(
      params.id,
      params.latitude,
      params.longitude,
      params.zoom
    );
  }
}
