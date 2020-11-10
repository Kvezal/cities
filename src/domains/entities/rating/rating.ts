import { Hotel } from '../hotel';
import { User } from '../user';
import { IRating } from './rating.interface';


export class Rating {
  constructor(
    private readonly  _value: number,
    private readonly _user: User,
    private readonly _hotel: Hotel
  ) {}

  get value(): number {
    return this._value;
  }

  get hotel(): Hotel {
    return this._hotel;
  }

  get user(): User {
    return this._user;
  }

  static create(params: IRating): Rating {
    return new Rating(
      params.value,
      User.create(params.user),
      Hotel.create(params.hotel)
    );
  }
}
