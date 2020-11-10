import { IHotelType } from './hotel-type.interface';


export class HotelType {
  constructor(
    private readonly _id: number,
    private readonly _title: string
  ) {}

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  static create(params: IHotelType): HotelType {
    return new HotelType(
      params.id,
      params.title
    );
  }
}
