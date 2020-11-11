import { UserEntity } from '../entities';


export interface CreateUserPort {
  createUser(userEntity: UserEntity): UserEntity;
}
