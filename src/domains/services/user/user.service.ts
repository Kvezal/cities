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

  public getUserById(userId: number): UserEntity {
    return this._userLoaderService.loadUserById(userId);
  }

  public createUser(userParams: IUser): UserEntity {
    const userEntity = UserEntity.create(userParams);
    return this._userCreatorService.createUser(userEntity);
  }
}
