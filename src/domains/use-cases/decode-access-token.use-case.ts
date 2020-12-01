import { IJsonWebTokenParams } from 'domains/entities';


export interface DecodeAccessTokenUseCase {
  decodeAccessToken(token: string): Promise<IJsonWebTokenParams>;
}
