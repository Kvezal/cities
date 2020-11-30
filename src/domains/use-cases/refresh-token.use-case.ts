import { JsonWebTokenEntity } from 'domains/entities';


export interface RefreshTokenUseCase {
  refreshToken(jsonWebTokenEntity: JsonWebTokenEntity): Promise<JsonWebTokenEntity>;
}
