import { IJsonWebTokenParams, JsonWebTokenEntity } from '../entities';


export interface DecodeAccessTokenUseCase {
  decodeAccessToken(jsonWebTokenEntity: JsonWebTokenEntity): Promise<IJsonWebTokenParams>;
}
