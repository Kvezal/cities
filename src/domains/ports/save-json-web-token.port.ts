import { JsonWebTokenEntity } from '../entities';


export interface SaveJsonWebTokenPort {
  saveJsonWebToken(jsonWebToken: JsonWebTokenEntity): JsonWebTokenEntity;
}
