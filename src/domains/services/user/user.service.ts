import { hash } from 'bcrypt';

import { SALT_ROUND } from 'domains/constants';
import { IUser, UserEntity } from 'domains/entities';
import { SaveUserPort, LoadUserByIdPort } from 'domains/ports';
import { GetUserByIdQuery } from 'domains/queries';
import { CreateUserUseCase } from 'domains/use-cases';


export class UserService implements
  GetUserByIdQuery,
  CreateUserUseCase {
  constructor(
    private readonly _userLoaderService: LoadUserByIdPort,
    private readonly _userCreatorService: SaveUserPort
  ) {}

  public async getUserById(userId: number): Promise<UserEntity> {
    return this._userLoaderService.loadUserById(userId);
  }

  public async createUser(userParams: IUser): Promise<UserEntity> {
    userParams.password = await hash(userParams.password, SALT_ROUND);
    const userEntity = UserEntity.create(userParams);
    return this._userCreatorService.createUser(userEntity);
  }
}
