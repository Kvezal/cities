import { UserEntity } from 'domains/entities';


export interface GetUserByIdQuery {
  getUserById(userId: number): Promise<UserEntity>;
}
