import { JsonWebTokenEntity } from 'domains/entities';


export interface RefreshTokenUseCase {
  refreshToken(token: string): Promise<JsonWebTokenEntity>;
}
