import { HotelEntity, RatingEntity, UserEntity } from 'domains/entities';

import { IComment } from './comment.interface';


export class CommentEntity {
  constructor(
    private readonly _id: string,
    private readonly _text: string,
    private readonly _createdAt: Date,
    private readonly _rating: RatingEntity,
    private readonly _hotel: HotelEntity,
    private readonly _user: UserEntity,
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

  get rating(): RatingEntity {
    return this._rating;
  }

  get hotel(): HotelEntity {
    return this._hotel;
  }

  get user(): UserEntity {
    return this._user;
  }

  static create(params: IComment): CommentEntity {
    return new CommentEntity(
      params.id,
      params.text,
      params.createdAt,
      params.rating instanceof RatingEntity ? params.rating : RatingEntity.create(params.rating),
      params.hotel instanceof HotelEntity ? params.hotel : HotelEntity.create(params.hotel),
      params.user instanceof UserEntity ? params.user : UserEntity.create(params.user)
    );
  }
}
