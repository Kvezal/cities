import { UserEntity } from '../entities';


export interface CreateUserPort {
  createUser(userEntity: UserEntity): Promise<UserEntity>;
}
