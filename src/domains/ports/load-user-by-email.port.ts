import { UserEntity } from '../entities';


export interface LoadUserByEmailPort {
  loadUserByEmail(email: string): UserEntity;
}
