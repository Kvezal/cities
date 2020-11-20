import { IRating } from './rating.interface';


export class RatingEntity {
  constructor(
    private readonly  _value: number,
    private readonly _userId: string,
    private readonly _hotelId: string
  ) {}

  get value(): number {
    return this._value;
  }

  get userId(): string {
    return this._userId;
  }

  get hotelId(): string {
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
