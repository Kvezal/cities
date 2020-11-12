import { UserEntity } from '../entities';


export interface LoadUserByEmailPort {
  loadUserByEmail(email: string): Promise<UserEntity>;
}
