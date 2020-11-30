import { JsonWebTokenEntity } from 'domains/entities';


export interface CheckTokenUseCase {
  checkAccessToken(jsonWebTokenEntity: JsonWebTokenEntity): Promise<boolean>;
}
