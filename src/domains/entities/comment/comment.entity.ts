import { IComment } from './comment.interface';
import {
  HotelEntity,
  UserEntity,
} from 'domains/entities';


export class CommentEntity {
  constructor(
    private readonly _id: string,
    private readonly _text: string,
    private readonly _createdAt: Date,
    private readonly _hotel: HotelEntity,
    private readonly _user: UserEntity,
    private readonly _rating: number,
  ) {}

  get id(): string {
    return this._id;
  }

  get text(): string {
    return this._text;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get hotel(): HotelEntity {
    return this._hotel;
  }

  get user(): UserEntity {
    return this._user;
  }

  get rating(): number {
    return this._rating;
  }

  static create(params: IComment): CommentEntity {
    return new CommentEntity(
      params.id,
      params.text,
      params.createdAt,
      params.hotel instanceof HotelEntity ? params.hotel : HotelEntity.create(params.hotel),
      params.user instanceof UserEntity ? params.user : UserEntity.create(params.user),
      params.rating
    );
  }
}
