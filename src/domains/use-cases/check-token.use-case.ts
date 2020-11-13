import { JsonWebTokenEntity } from '../entities';


export interface CheckTokenUseCase {
  checkAccessToken(jsonWebTokenEntity: JsonWebTokenEntity): Promise<boolean>;
}
