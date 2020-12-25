import { FavoriteEntity } from 'domains/entities';
import { ToggleFavoriteUseCase } from 'domains/use-cases';
import {
  EHotelField,
  HotelException,
} from 'domains/exceptions/hotel';
import {
  EUserField,
  UserError,
} from 'domains/exceptions';
import {
  DeleteFavoritePort,
  LoadFavoritePort,
  SaveFavoritePort,
  LoadHotelByIdPort,
  LoadUserByIdPort,
} from 'domains/ports';


export class FavoriteService implements ToggleFavoriteUseCase {
  constructor(
    private readonly _hotelLoaderService: LoadHotelByIdPort,
    private readonly _userLoaderService: LoadUserByIdPort,
    private readonly _favoriteLoaderService: LoadFavoritePort,
    private readonly _favoriteSaverService: SaveFavoritePort,
    private readonly _favoriteDeleterService: DeleteFavoritePort,
  ) {
  }

  public async toggleFavorite(userId: string, hotelId: string): Promise<FavoriteEntity> {
    const hotel = await this._hotelLoaderService.loadHotelById(hotelId);
    if (!hotel) {
      throw new HotelException({
        field: EHotelField.ID,
        message: `Hotel with ${hotelId} id doesn't exist`,
      });
    }
    const user = await this._userLoaderService.loadUserById(userId);
    if (!user) {
      throw new UserError({
        field: EUserField.ID,
        message: `User with ${userId} doesn't exist`,
      });
    }

    const favorite = await this._favoriteLoaderService.loadFavorite(userId, hotelId)
    favorite.toggle();
    if (favorite.value) {
      return await this._favoriteSaverService.saveFavorite(favorite);
    } else {
      return await this._favoriteDeleterService.deleteFavorite(favorite);
    }
  }
}