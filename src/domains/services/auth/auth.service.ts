import { compare } from 'bcrypt';

import { IJsonWebTokenParams, JsonWebTokenEntity } from 'domains/entities';
import { IUserAuthenticate } from 'domains/interfaces';
import { DeleteJsonWebTokenPort, CheckExistedJsonWebTokenPort, LoadUserByEmailPort, SaveJsonWebTokenPort } from 'domains/ports';
import {
  AuthenticateUserUseCase,
  CheckTokenUseCase,
  DecodeAccessTokenUseCase,
  RefreshTokenUseCase,
} from 'domains/use-cases';


export class AuthService implements
  AuthenticateUserUseCase,
  CheckTokenUseCase,
  DecodeAccessTokenUseCase,
  RefreshTokenUseCase {
  constructor(
    private readonly _userLoaderService: LoadUserByEmailPort,
    private readonly _jsonWebTokenSaverService: SaveJsonWebTokenPort,
    private readonly _jsonWebTokenCheckerService: CheckExistedJsonWebTokenPort,
    private readonly _jsonWebTokenDeleterService: DeleteJsonWebTokenPort
  ) {}


  public async authenticateUser(params: IUserAuthenticate): Promise<JsonWebTokenEntity> {
    const userEntity = await this._userLoaderService.loadUserByEmail(params.email);
    if (!userEntity) {
      throw new Error(`user with ${params.email} id is not existed`);
    }
    const isCorrectPassword = await compare(params.password, userEntity.password);
    if (!isCorrectPassword) {
      throw new Error(`user password is invalid`);
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
    const isValid = await jsonWebTokenEntity.checkRefreshToken();
    if (!isValid) {
      throw new Error(`JSON Web Token is invalid`);
    }
    const isExistedToken = await this._jsonWebTokenCheckerService.checkExistedJsonWebToken(jsonWebTokenEntity);
    if (!isExistedToken) {
      throw new Error(`JSON Web Token isn't existed`);
    }
    await this._jsonWebTokenDeleterService.deleteJsonWebToken(jsonWebTokenEntity.refreshToken);
    const newJsonWebToken = await jsonWebTokenEntity.refresh();
    return this._jsonWebTokenSaverService.saveJsonWebToken(newJsonWebToken);
  }
}
