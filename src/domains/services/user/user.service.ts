import { hash } from 'bcrypt';

import { SALT_ROUND } from '../../constants';
import { IUser, UserEntity } from '../../entities';
import { CreateUserPort, LoadUserByIdPort } from '../../ports';
import { GetUserByIdQuery } from '../../queries';
import { CreateUserUseCase } from '../../use-cases';


export class UserService implements
  GetUserByIdQuery,
  CreateUserUseCase {
  constructor(
    private readonly _userLoaderService: LoadUserByIdPort,
    private readonly _userCreatorService: CreateUserPort
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
