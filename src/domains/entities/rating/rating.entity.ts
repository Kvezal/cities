import { IRating } from './rating.interface';


export class RatingEntity {
  constructor(
    private readonly  _value: number,
    private readonly _userId: number,
    private readonly _hotelId: number
  ) {}

  get value(): number {
    return this._value;
  }

  get userId(): number {
    return this._userId;
  }

  get hotelId(): number {
    return this._hotelId;
  }

  static create(params: IRating): RatingEntity {
    return new RatingEntity(
      params.value,
      params.userId,
      params.hotelId
    );
  }
}
