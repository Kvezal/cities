import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { HotelEntity } from 'domains/entities';
import {
  AuthService,
  authServiceSymbol,
  HotelService,
  hotelServiceSymbol,
} from 'domains/services';
import {
  HotelMapper,
  HotelOrmEntity,
} from 'modules/adapters';


@Injectable()
export class FavoriteControllerService {
  constructor(
    @Inject(authServiceSymbol) private readonly _authService: AuthService,
    @Inject(hotelServiceSymbol) private readonly _hotelService: HotelService
  ) {}

  public async toggleFavoriteStatus(hotelId: string, accessToken: string): Promise<HotelOrmEntity> {
    const userParams = await this._authService.decodeAccessToken(accessToken);
    const hotelEntity: HotelEntity = await this._hotelService.toggleHotelFavoriteState(userParams.id, hotelId);
    return HotelMapper.mapToOrmEntity(hotelEntity);
  }
}
