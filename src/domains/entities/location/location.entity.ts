import { DISTANCE_ACCURACY } from '../../constants';
import { ILocation } from './location.interface';


export class LocationEntity {
  constructor(
    private readonly _id: number,
    private readonly _latitude: number,
    private readonly _longitude: number,
    private readonly _zoom: number,
  ) {}

  get id(): number {
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

  public calculateDistance (otherLocation: ILocation): number {
    const diffLatitude: number = Math.round(this.latitude * DISTANCE_ACCURACY - otherLocation.latitude * DISTANCE_ACCURACY);
    const diffLongitude: number = Math.round(this.longitude * DISTANCE_ACCURACY - otherLocation.longitude * DISTANCE_ACCURACY);
    return ((diffLatitude ** 2 + diffLongitude ** 2) ** 0.5) / DISTANCE_ACCURACY;
  }
}
