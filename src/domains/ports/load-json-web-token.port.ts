import { JsonWebTokenEntity } from 'domains/entities';


export interface LoadJsonWebTokenPort {
  loadJsonWebToken(refreshToken: string): Promise<JsonWebTokenEntity>;
}
