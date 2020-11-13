import { UserEntity } from '../entities';


export interface CreateUserUseCase {
  createUser(userEntity: UserEntity): Promise<UserEntity>;
}
