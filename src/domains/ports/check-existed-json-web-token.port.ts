import { JsonWebTokenEntity } from '../entities';


export interface CheckExistedJsonWebTokenPort {
  checkExistedJsonWebToken(refreshToken: JsonWebTokenEntity): Promise<boolean>;
}
