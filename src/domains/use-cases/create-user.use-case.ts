import { UserEntity } from '../entities/user';


export interface CreateUserUseCase {
  createUser(userEntity: UserEntity): UserEntity;
}
