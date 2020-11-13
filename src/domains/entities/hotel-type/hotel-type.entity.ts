import { IHotelType } from './hotel-type.interface';


export class HotelTypeEntity {
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

  static create(params: IHotelType): HotelTypeEntity {
    return new HotelTypeEntity(
      params.id,
      params.title
    );
  }
}
