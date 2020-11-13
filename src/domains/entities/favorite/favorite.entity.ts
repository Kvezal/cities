import { IFavorite } from './favorite.interface';


export class FavoriteEntity {
  constructor(
    private readonly _value: boolean,
    private readonly _userId: number,
    private readonly _hotelId: number
  ) {}

  get value(): boolean {
    return this._value;
  }

  get userId(): number {
    return this._userId;
  }

  get hotelId(): number {
    return this._hotelId;
  }

  static create(params: IFavorite): FavoriteEntity {
    return new FavoriteEntity(
      params.value,
      params.userId,
      params.hotelId
    );
  }

  public toggleFavoriteStateOfHotel(): FavoriteEntity {
    const params = this._getParams();
    params.value = !params.value;
    return FavoriteEntity.create(params);
  }

  private _getParams() {
    return {
      value: this.value,
      userId: this.userId,
      hotelId: this.hotelId,
    };
  }
}
