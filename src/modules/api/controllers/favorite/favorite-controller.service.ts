import { Inject, Injectable } from '@nestjs/common';

import { FavoriteEntity, HotelEntity } from 'domains/entities';
import { AuthService, authServiceSymbol, FavoriteService, favoriteServiceSymbol } from 'domains/services';
import { FavoriteMapper, FavoriteOrmEntity, HotelMapper, HotelOrmEntity } from 'modules/adapters';


@Injectable()
export class FavoriteControllerService {
  constructor(
    @Inject(favoriteServiceSymbol) private readonly _favoriteService: FavoriteService,
    @Inject(authServiceSymbol) private readonly _authService: AuthService
  ) {}


  public async getFavoriteHotelList(accessToken: string): Promise<HotelOrmEntity[]> {
    const userParams = await this._authService.decodeAccessToken(accessToken);
    const hotelEntities: HotelEntity[] = await this._favoriteService.getFavoriteHotelList(userParams.id);
    return hotelEntities.map((hotelEntity: HotelEntity) => HotelMapper.mapToOrmEntity(hotelEntity));
  }


  public async toggleFavoriteStatus(hotelId: string, accessToken: string): Promise<FavoriteOrmEntity> {
    const userParams = await this._authService.decodeAccessToken(accessToken);
    const favoriteEntity: FavoriteEntity = await this._favoriteService.toggleFavoriteStateOfHotelForUser(userParams.id, hotelId);
    return FavoriteMapper.mapToOrmEntity(favoriteEntity);
  }
}
