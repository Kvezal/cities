import { UserType } from '../user-type';
import { Image } from '../image';
import { IUser } from './user.interface';

export class User {
  constructor(
    private readonly _id: number,
    private readonly _name: string,
    private readonly _email: string,
    private readonly _password: string,
    private readonly _type: UserType,
    private readonly _image: Image,
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get type(): UserType {
    return this._type;
  }

  get image(): Image {
    return this._image;
  }

  static create(params: IUser): User {
    return new User(
      params.id,
      params.name,
      params.email,
      params.password,
      UserType.create(params.type),
      Image.create(params.image)
    );
  }
}
