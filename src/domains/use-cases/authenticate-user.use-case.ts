import { JsonWebTokenEntity } from '../entities';
import { IUserAuthenticate } from '../interfaces';


export interface AuthenticateUserUseCase {
  authenticateUser(params: IUserAuthenticate): Promise<JsonWebTokenEntity>;
}