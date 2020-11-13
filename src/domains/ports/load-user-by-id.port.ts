import { UserEntity } from '../entities';


export interface LoadUserByIdPort {
  loadUserById(userId: number): Promise<UserEntity>;
}
