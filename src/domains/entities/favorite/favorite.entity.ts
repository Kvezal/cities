import { IFavorite } from './favorite.interface';


export class FavoriteEntity {
  constructor(
    private readonly _value: boolean,
    private readonly _userId: string,
    private readonly _hotelId: string
  ) {}

  get value(): boolean {
    return this._value;
  }

  get userId(): string {
    return this._userId;
  }

  get hotelId(): string {
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
    const params: IFavorite = this._getParams();
    params.value = !params.value;
    return FavoriteEntity.create(params);
  }

  private _getParams(): IFavorite {
    return {
      value: this.value,
      userId: this.userId,
      hotelId: this.hotelId,
    };
  }
}
