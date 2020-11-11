import { IUserAuthenticate } from '../interfaces';


export interface AuthenticateUserUseCase {
  authenticateUser(params: IUserAuthenticate);
}
