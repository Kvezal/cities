import { FavoriteEntity, HotelEntity } from 'domains/entities';
import { DeleteUserHotelStatePort, LoadFavoriteHotelListPort, LoadUserStateOfHotelPort, SaveUserHotelStatePort } from 'domains/ports';
import { GetFavoriteHotelListQuery } from 'domains/queries';
import { ToggleFavoriteStateOfHotelForUserUseCase } from 'domains/use-cases';


export class FavoriteService implements
  GetFavoriteHotelListQuery,
  ToggleFavoriteStateOfHotelForUserUseCase {
  constructor(
    private readonly _favoriteHotelLoaderService: LoadFavoriteHotelListPort,
    private readonly _favoriteHotelStateLoaderService: LoadUserStateOfHotelPort,
    private readonly _favoriteHotelStateUpdaterService: SaveUserHotelStatePort,
    private readonly _favoriteHotelStateDeleterService: DeleteUserHotelStatePort
  ) {}

  public async getFavoriteHotelList(userId: string): Promise<HotelEntity[]> {
    return this._favoriteHotelLoaderService.loadFavoriteHotelList(userId);
  }

  public async toggleFavoriteStateOfHotelForUser(userId: string, hotelId: string): Promise<FavoriteEntity> {
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
