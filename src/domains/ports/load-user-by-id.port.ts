import { UserEntity } from 'domains/entities';


export interface LoadUserByIdPort {
  loadUserById(userId: string): Promise<UserEntity>;
}
