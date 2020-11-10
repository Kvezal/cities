import { IImage } from './image.interface';


export class Image {
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

  static create(params: IImage): Image {
    return new Image(
      params.id,
      params.title
    );
  }
}
