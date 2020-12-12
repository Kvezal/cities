import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { FavoriteEntity } from 'domains/entities';
import {
  AuthService,
  authServiceSymbol,
  FavoriteService,
  favoriteServiceSymbol,
} from 'domains/services';
import {
  FavoriteMapper,
  FavoriteOrmEntity,
} from 'modules/adapters';


@Injectable()
export class FavoriteControllerService {
  constructor(
    @Inject(authServiceSymbol) private readonly _authService: AuthService,
    @Inject(favoriteServiceSymbol) private readonly _favoriteService: FavoriteService
  ) {}

  public async toggleFavoriteStatus(hotelId: string, accessToken: string): Promise<FavoriteOrmEntity> {
    const userParams = await this._authService.decodeAccessToken(accessToken);
    const favoriteEntity: FavoriteEntity = await this._favoriteService.toggleHotelFavoriteState(userParams.id, hotelId);
    return FavoriteMapper.mapToOrmEntity(favoriteEntity);
  }
}
