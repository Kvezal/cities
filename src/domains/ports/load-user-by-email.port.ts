import { UserEntity } from 'domains/entities';


export interface LoadUserByEmailPort {
  loadUserByEmail(email: string): Promise<UserEntity>;
}
