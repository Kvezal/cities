import { IImage } from './image.interface';


export class ImageEntity {
  constructor(
    private readonly _id: string,
    private readonly _title: string
  ) {}

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  static create(params: IImage): ImageEntity {
    return new ImageEntity(
      params.id,
      params.title
    );
  }
}
