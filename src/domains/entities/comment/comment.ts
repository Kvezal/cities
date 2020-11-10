import { IComment } from './comment.interface';
import { Hotel } from '../hotel';
import { User } from '../user';


export class Comment {
  constructor(
    private readonly _id: number,
    private readonly _text: string,
    private readonly _date: Date,
    private readonly _rating: number,
    private readonly _hotel: Hotel,
    private readonly _user: User,
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

  get rating(): number {
    return this._rating;
  }

  get hotel(): Hotel {
    return this._hotel;
  }

  get user(): User {
    return this._user;
  }

  static create(params: IComment): Comment {
    return new Comment(
      params.id,
      params.text,
      params.date,
      params.rating,
      Hotel.create(params.hotel),
      User.create(params.user)
    );
  }
}
