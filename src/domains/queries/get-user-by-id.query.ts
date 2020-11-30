import { UserEntity } from 'domains/entities';


export interface GetUserByIdQuery {
  getUserById(userId: string): Promise<UserEntity>;
}
