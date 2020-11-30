import { IJsonWebTokenParams, JsonWebTokenEntity } from 'domains/entities';


export interface DecodeAccessTokenUseCase {
  decodeAccessToken(jsonWebTokenEntity: JsonWebTokenEntity): Promise<IJsonWebTokenParams>;
}
