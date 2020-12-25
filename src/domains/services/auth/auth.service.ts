import { compare, hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { SALT_ROUND } from 'domains/constants';
import { IJsonWebTokenParams, IUser, JsonWebTokenEntity, UserEntity, UserTypeEntity } from 'domains/entities';
import { EJsonWebTokenType, JsonWebTokenError, EUserField, UserError } from 'domains/exceptions';
import { IUserAuthenticate } from 'domains/interfaces';
import {
  CheckExistedJsonWebTokenPort,
  DeleteJsonWebTokenPort,
  LoadUserByEmailPort,
  LoadUserTypeByTitlePort,
  SaveJsonWebTokenPort,
  SaveUserPort,
} from 'domains/ports';
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
    private readonly _userSaverService: SaveUserPort,
    private readonly _userTypeLoaderService: LoadUserTypeByTitlePort,
    private readonly _jsonWebTokenSaverService: SaveJsonWebTokenPort,
    private readonly _jsonWebTokenCheckerService: CheckExistedJsonWebTokenPort,
    private readonly _jsonWebTokenDeleterService: DeleteJsonWebTokenPort
  ) {}


  public async authenticateUser(params: IUserAuthenticate): Promise<JsonWebTokenEntity> {
    let userEntity: UserEntity = await this._userLoaderService.loadUserByEmail(params.email);
    if (!userEntity) {
      const userParams = await this.getUserParams(params);
      userEntity = await this.signUp(userParams);
    }

    const isCorrectPassword = await compare(params.password, userEntity.password.trim());
    if (!isCorrectPassword) {
      throw new UserError({
        field: EUserField.PASSWORD,
        message: `user password is invalid`,
      });
    }
    const jsonWebTokenEntity = JsonWebTokenEntity.generate({
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      image: userEntity.image?.title,
    });
    await this._jsonWebTokenSaverService.saveJsonWebToken(jsonWebTokenEntity.refreshToken);
    return jsonWebTokenEntity;
  }


  public async getUserParams(params: IUserAuthenticate): Promise<IUser> {
    const userType: UserTypeEntity = await this._userTypeLoaderService.loadUserTypeByTitle(`standard`);
    const password = await hash(params.password, SALT_ROUND);
    return {
      ...params,
      password,
      id: uuidv4(),
      name: params.email.split(`@`)[0],
      image: {
        id: uuidv4(),
        title: null,
      },
      type: userType,
    };
  }


  public async signUp(userParams: IUser): Promise<UserEntity> {
    const userEntity = UserEntity.create(userParams);
    return this._userSaverService.saveUser(userEntity);
  }


  public async checkAccessToken(accessToken: string): Promise<boolean> {
    const isValidJsonWebToken = await JsonWebTokenEntity.checkAccessToken(accessToken);
    if (!isValidJsonWebToken) {
      throw new JsonWebTokenError({
        type: EJsonWebTokenType.INVALID,
        message: `JSON Web Token is invalid`,
      });
    }
    return isValidJsonWebToken;
  }


  public async decodeAccessToken(accessToken: string): Promise<IJsonWebTokenParams> {
    const jsonWebTokenParams = await JsonWebTokenEntity.decodeAccessToken(accessToken);
    if (!jsonWebTokenParams) {
      throw new JsonWebTokenError({
        type: EJsonWebTokenType.INVALID,
        message: `JSON Web Token is invalid`,
      });
    }
    return jsonWebTokenParams;
  }


  public async refreshToken(refreshToken: string): Promise<JsonWebTokenEntity> {
    const isValid = await JsonWebTokenEntity.checkRefreshToken(refreshToken);
    if (!isValid) {
      throw new JsonWebTokenError({
        type: EJsonWebTokenType.INVALID,
        message: `JSON Web Token is invalid`,
      });
    }
    const isExistedToken = await this._jsonWebTokenCheckerService.checkExistedJsonWebToken(refreshToken);
    if (!isExistedToken) {
      throw new JsonWebTokenError({
        type: EJsonWebTokenType.IS_NOT_EXISTED,
        message: `JSON Web Token isn't existed`,
      });
    }
    await this._jsonWebTokenDeleterService.deleteJsonWebToken(refreshToken);
    const newJsonWebToken = await JsonWebTokenEntity.refresh(refreshToken);
    await this._jsonWebTokenSaverService.saveJsonWebToken(newJsonWebToken.refreshToken);
    return newJsonWebToken;

  }
}
