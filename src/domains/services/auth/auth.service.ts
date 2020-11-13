import { compare } from 'bcrypt';

import { IJsonWebTokenParams, JsonWebTokenEntity } from '../../entities';
import { IUserAuthenticate } from '../../interfaces';
import { DeleteJsonWebTokenPort, LoadJsonWebTokenPort, LoadUserByEmailPort, SaveJsonWebTokenPort } from '../../ports';
import {
  AuthenticateUserUseCase,
  CheckTokenUseCase,
  DecodeAccessTokenUseCase,
  RefreshTokenUseCase,
} from '../../use-cases';


export class AuthService implements
  AuthenticateUserUseCase,
  CheckTokenUseCase,
  DecodeAccessTokenUseCase,
  RefreshTokenUseCase {
  constructor(
    private readonly _userLoaderService: LoadUserByEmailPort,
    private readonly _jsonWebTokenSaverService: SaveJsonWebTokenPort,
    private readonly _jsonWebTokenLoaderService: LoadJsonWebTokenPort,
    private readonly _jsonWebTokenDeleterService: DeleteJsonWebTokenPort
  ) {}

  public async authenticateUser(params: IUserAuthenticate): Promise<JsonWebTokenEntity> {
    const userEntity = await this._userLoaderService.loadUserByEmail(params.email);
    if (!userEntity) {
      return;
    }
    const isCorrectPassword = await compare(params.password, userEntity.password);
    if (!isCorrectPassword) {
      return;
    }
    const jsonWebTokenEntity = JsonWebTokenEntity.generate({
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.name,
      image: userEntity.image,
    });
    return this._jsonWebTokenSaverService.saveJsonWebToken(jsonWebTokenEntity);
  }

  public async checkAccessToken(jsonWebTokenEntity: JsonWebTokenEntity): Promise<boolean> {
    return jsonWebTokenEntity.checkAccessToken();
  }

  public async decodeAccessToken(jsonWebTokenEntity: JsonWebTokenEntity): Promise<IJsonWebTokenParams> {
    return jsonWebTokenEntity.decodeAccessToken();
  }

  public async refreshToken(jsonWebTokenEntity: JsonWebTokenEntity): Promise<JsonWebTokenEntity> {
    const isValid = jsonWebTokenEntity.checkRefreshToken();
    if (!isValid) {
      return;
    }
    const loadedJsonWebTokenEntity = await this._jsonWebTokenLoaderService.loadJsonWebToken(jsonWebTokenEntity.refreshToken);
    if (!loadedJsonWebTokenEntity) {
      return;
    }
    await this._jsonWebTokenDeleterService.deleteJsonWebToken(loadedJsonWebTokenEntity.refreshToken);
    const newJsonWebToken = await loadedJsonWebTokenEntity.refresh();
    return this._jsonWebTokenSaverService.saveJsonWebToken(newJsonWebToken);
  }
}
