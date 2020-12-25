import { UserEntity } from 'domains/entities';

import { IComment } from './comment.interface';


export class CommentEntity {
  constructor(
    private readonly _id: string,
    private readonly _text: string,
    private readonly _createdAt: Date,
    private readonly _hotelId: string,
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

  get hotelId(): string {
    return this._hotelId;
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
      params.hotelId,
      params.user instanceof UserEntity ? params.user : UserEntity.create(params.user),
      params.rating
    );
  }
}
