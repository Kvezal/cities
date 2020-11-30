import { UserEntity } from 'domains/entities';


export interface CreateUserUseCase {
  createUser(userEntity: UserEntity): Promise<UserEntity>;
}
