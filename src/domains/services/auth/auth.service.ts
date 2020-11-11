import { IJsonWebToken, JsonWebTokenEntity } from '../../entities';
import { IUserAuthenticate } from '../../interfaces';
import { LoadUserByEmailPort, SaveJsonWebTokenPort } from '../../ports';
import { AuthenticateUserUseCase } from '../../use-cases';


export class AuthService implements AuthenticateUserUseCase {
  constructor(
    private readonly _userLoaderService: LoadUserByEmailPort,
    private readonly _jsonWebTokenStoreService: SaveJsonWebTokenPort
  ) {}

  public authenticateUser(params: IUserAuthenticate): IJsonWebToken {
    const userEntity = this._userLoaderService.loadUserByEmail(params.email);
    if (!userEntity) {
      return;
    }
    const jsonWebTokenEntity = JsonWebTokenEntity.generate({
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.name,
      image: userEntity.image,
    });
    return this._jsonWebTokenStoreService.saveJsonWebToken(jsonWebTokenEntity);
  }
}
