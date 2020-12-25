import { UserEntity } from 'domains/entities';
import { LoadUserByIdPort } from 'domains/ports';
import { GetUserByIdQuery } from 'domains/queries';


export class UserService implements GetUserByIdQuery {
  constructor(
    private readonly _userLoaderService: LoadUserByIdPort
  ) {}

  public async getUserById(userId: string): Promise<UserEntity> {
    return await this._userLoaderService.loadUserById(userId);
  }
}
