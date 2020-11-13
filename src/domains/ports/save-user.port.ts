import { UserEntity } from 'domains/entities';


export interface SaveUserPort {
  createUser(userEntity: UserEntity): Promise<UserEntity>;
}
