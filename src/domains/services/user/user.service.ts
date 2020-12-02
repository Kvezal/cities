import { UserEntity } from 'domains/entities';
import { LoadUserByIdPort } from 'domains/ports';
import { GetUserByIdQuery } from 'domains/queries';
import { UserMapper, UserOrmEntity } from 'modules/adapters';


export class UserService implements GetUserByIdQuery {
  constructor(
    private readonly _userLoaderService: LoadUserByIdPort
  ) {}

  public async getUserById(userId: string): Promise<UserEntity> {
    const userOrmEntity: UserOrmEntity = await this._userLoaderService.loadUserById(userId);
    return userOrmEntity && UserMapper.mapToDomain(userOrmEntity);
  }
}
