import { IFeature } from './feature.interface';


export class FeatureEntity {
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

  static create(params: IFeature): FeatureEntity {
    return new FeatureEntity(
      params.id,
      params.title
    );
  }
}
