import { HotelEntity } from '../hotel';
import { RatingEntity } from '../rating';
import { UserEntity } from '../user';
import { IComment } from './comment.interface';


export class CommentEntity {
  constructor(
    private readonly _id: number,
    private readonly _text: string,
    private readonly _date: Date,
    private readonly _rating: RatingEntity,
    private readonly _hotel: HotelEntity,
    private readonly _user: UserEntity,
  ) {}

  get id(): number {
    return this._id;
  }

  get text(): string {
    return this._text;
  }

  get date(): Date {
    return this._date;
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
    const ratingParams = {
      value: params.rating,
      userId: params.user.id,
      hotelId: params.hotel.id,
    };

    return new CommentEntity(
      params.id,
      params.text,
      params.date,
      RatingEntity.create(ratingParams),
      HotelEntity.create(params.hotel),
      UserEntity.create(params.user)
    );
  }
}
