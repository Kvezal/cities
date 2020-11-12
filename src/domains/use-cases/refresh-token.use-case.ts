import { JsonWebTokenEntity } from '../entities';


export interface RefreshTokenUseCase {
  refreshToken(jsonWebTokenEntity: JsonWebTokenEntity): Promise<JsonWebTokenEntity>;
}
