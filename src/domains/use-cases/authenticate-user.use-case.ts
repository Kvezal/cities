import { JsonWebTokenEntity } from 'domains/entities';
import { IUserAuthenticate } from 'domains/interfaces';


export interface AuthenticateUserUseCase {
  authenticateUser(params: IUserAuthenticate): Promise<JsonWebTokenEntity>;
}
