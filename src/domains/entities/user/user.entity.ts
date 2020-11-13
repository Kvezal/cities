import { ImageEntity, UserTypeEntity } from 'domains/entities';

import { IUser } from './user.interface';

export class UserEntity {
  constructor(
    private readonly _id: number,
    private readonly _name: string,
    private readonly _email: string,
    private readonly _password: string,
    private readonly _type: UserTypeEntity,
    private readonly _image: ImageEntity,
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

  get type(): UserTypeEntity {
    return this._type;
  }

  get image(): ImageEntity {
    return this._image;
  }

  static create(params: IUser): UserEntity {
    return new UserEntity(
      params.id,
      params.name,
      params.email,
      params.password,
      params.type instanceof UserTypeEntity ? params.type : UserTypeEntity.create(params.type),
      params.image instanceof ImageEntity ? params.image : ImageEntity.create(params.image)
    );
  }
}
