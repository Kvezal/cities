import { IUserType } from './user-type.interface';


export class UserType {
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

  static create(params: IUserType): UserType {
    return new UserType(
      params.id,
      params.title
    );
  }
}
