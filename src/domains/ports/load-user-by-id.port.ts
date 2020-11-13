import { UserEntity } from 'domains/entities';


export interface LoadUserByIdPort {
  loadUserById(userId: number): Promise<UserEntity>;
}
