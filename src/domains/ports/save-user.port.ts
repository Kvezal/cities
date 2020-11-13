import { UserEntity } from '../entities';


export interface SaveUserPort {
  createUser(userEntity: UserEntity): Promise<UserEntity>;
}
