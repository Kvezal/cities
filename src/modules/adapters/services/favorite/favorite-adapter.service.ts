import { Inject } from '@nestjs/common';

import { FavoriteEntity } from 'domains/entities';
import { FavoritesDbTable } from 'modules/db';
import {
  DeleteFavoritePort,
  LoadFavoritePort,
  SaveFavoritePort,
} from 'domains/ports';


export class FavoriteAdapterService implements LoadFavoritePort,
  SaveFavoritePort,
  DeleteFavoritePort {
  constructor(
    @Inject(FavoritesDbTable) private _favoritesDbTable: FavoritesDbTable) {
  }


  public async loadFavorite(userId: string, hotelId: string): Promise<FavoriteEntity> {
    const favorite = await this._favoritesDbTable.findOne({
      user_id: userId,
      hotel_id: hotelId,
    });
    return FavoriteEntity.create({
      value: Boolean(favorite),
      userId,
      hotelId,
    });
  }


  public async saveFavorite(favorite: FavoriteEntity): Promise<FavoriteEntity> {
    const { userId, hotelId } = favorite;
    await this._favoritesDbTable.createOne({
      user_id: userId,
      hotel_id: hotelId,
    });
    return favorite;
  }


  public async deleteFavorite(favorite: FavoriteEntity): Promise<FavoriteEntity> {
    const { userId, hotelId } = favorite;
    await this._favoritesDbTable.removeOne({
      user_id: userId,
      hotel_id: hotelId,
    });
    return favorite;
  }

}