import { JsonWebTokenEntity } from 'domains/entities';


export interface SaveJsonWebTokenPort {
  saveJsonWebToken(jsonWebToken: JsonWebTokenEntity): Promise<JsonWebTokenEntity>;
}
