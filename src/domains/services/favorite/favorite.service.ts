import { FavoriteEntity, HotelEntity } from 'domains/entities';
import { LoadFavoriteHotelListPort, LoadUserStateOfHotelPort, SaveUserHotelStatePort } from 'domains/ports';
import { GetFavoriteHotelListQuery } from 'domains/queries';
import { ToggleFavoriteStateOfHotelForUserUseCase } from 'domains/use-cases';


export class FavoriteService implements
  GetFavoriteHotelListQuery,
  ToggleFavoriteStateOfHotelForUserUseCase {
  constructor(
    private readonly _favoriteHotelLoaderService: LoadFavoriteHotelListPort,
    private readonly _favoriteHotelStateLoaderService: LoadUserStateOfHotelPort,
    private readonly _favoriteHotelStateUpdaterService: SaveUserHotelStatePort
  ) {}

  public async getFavoriteHotelList(userId: number): Promise<HotelEntity[]> {
    return this._favoriteHotelLoaderService.loadFavoriteHotelList(userId);
  }

  public async toggleFavoriteStateOfHotelForUser(userId: number, hotelId: number): Promise<FavoriteEntity> {
    const hotelUserState = await this._favoriteHotelStateLoaderService.loadUserStateOfHotel(userId, hotelId);
    if (!hotelUserState) {
      return;
    }
    const updatedHotelFavoriteState = await hotelUserState.toggleFavoriteStateOfHotel();
    return this._favoriteHotelStateUpdaterService.saveUserHotelState(updatedHotelFavoriteState);
  }
}
