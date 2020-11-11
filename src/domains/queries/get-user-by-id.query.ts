import { UserEntity } from '../entities/user';


export interface GetUserByIdQuery {
  getUserById(userId: number): UserEntity;
}
