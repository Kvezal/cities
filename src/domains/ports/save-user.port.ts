import { UserEntity } from 'domains/entities';


export interface SaveUserPort {
  saveUser(userEntity: UserEntity): Promise<UserEntity>;
}
