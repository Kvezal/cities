import { Hotel } from '../hotel';
import { User } from '../user';


export class Favorite {
  constructor(
    private readonly  _value: boolean,
    private readonly _user: User,
    private readonly _hotel: Hotel
  ) {}

  get value(): boolean {
    return this._value;
  }

  get user(): User {
    return this._user;
  }

  get hotel(): Hotel {
    return this._hotel;
  }

  static create(params): Favorite {
    return new Favorite(
      params.value,
      User.create(params.user),
      Hotel.create(params.hotel)
    );
  }
}
