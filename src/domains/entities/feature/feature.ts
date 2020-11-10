import { IFeature } from './feature.interface';


export class Feature {
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

  static create(params: IFeature): Feature {
    return new Feature(
      params.id,
      params.title
    );
  }
}
