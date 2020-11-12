import { JsonWebTokenEntity } from '../entities';


export interface LoadJsonWebTokenPort {
  loadJsonWebToken(refreshToken: string): Promise<JsonWebTokenEntity>;
}
