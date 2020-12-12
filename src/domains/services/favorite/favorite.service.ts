import { FavoriteEntity } from 'domains/entities';
import {
  DeleteUserHotelStatePort,
  LoadFavoriteHotelListPort,
  LoadUserStateOfHotelPort,
  SaveUserHotelStatePort,
} from 'domains/ports';
import { ToggleHotelFavoriteStateUseCase } from 'domains/use-cases';


export class FavoriteService implements ToggleHotelFavoriteStateUseCase {
  constructor(
    private readonly _favoriteHotelLoaderService: LoadFavoriteHotelListPort,
    private readonly _favoriteHotelStateLoaderService: LoadUserStateOfHotelPort,
    private readonly _favoriteHotelStateUpdaterService: SaveUserHotelStatePort,
    private readonly _favoriteHotelStateDeleterService: DeleteUserHotelStatePort
  ) {}

  public async toggleHotelFavoriteState(userId: string, hotelId: string): Promise<FavoriteEntity> {
    /*
    * получить hotel by id
    * - проверить hotel на существование, иначе пробросить ошибку
    * - изменить состояние isFavorite
    * - если после этого значение isFavorite = true, то сохранить записть для текуего пользователя иначе удалить
    * */

    let hotelUserState = await this._favoriteHotelStateLoaderService.loadUserStateOfHotel(userId, hotelId);
    if (!hotelUserState) {
      hotelUserState = FavoriteEntity.create({
        value: false,
        userId,
        hotelId,
      });
    }
    const toggledHotelFavoriteState = hotelUserState.toggleFavoriteStateOfHotel();
    if (toggledHotelFavoriteState.value) {
      return this._favoriteHotelStateUpdaterService.saveUserHotelState(toggledHotelFavoriteState);
    }
    await this._favoriteHotelStateDeleterService.deleteUserHotelState(toggledHotelFavoriteState);
    return toggledHotelFavoriteState;
  }
}
