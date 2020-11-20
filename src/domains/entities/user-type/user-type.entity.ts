import { IUserType } from './user-type.interface';


export class UserTypeEntity {
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

  static create(params: IUserType): UserTypeEntity {
    return new UserTypeEntity(
      params.id,
      params.title
    );
  }
}
