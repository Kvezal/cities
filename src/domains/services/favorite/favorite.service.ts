import { FavoriteEntity, HotelEntity } from '../../entities';
import { LoadFavoriteHotelListPort, LoadUserStateOfHotelPort, SaveUserHotelStatePort } from '../../ports';
import { GetFavoriteHotelListQuery } from '../../queries';
import { ToggleFavoriteStateOfHotelForUserUseCase } from '../../use-cases';


export class FavoriteService implements
  GetFavoriteHotelListQuery,
  ToggleFavoriteStateOfHotelForUserUseCase {
  constructor(
    private readonly _favoriteHotelLoaderService: LoadFavoriteHotelListPort,
    private readonly _favoriteHotelStateLoaderService: LoadUserStateOfHotelPort,
    private readonly _favoriteHotelStateUpdaterService: SaveUserHotelStatePort
  ) {}

  public getFavoriteHotelList(userId: number): HotelEntity[] {
    return this._favoriteHotelLoaderService.loadFavoriteHotelList(userId);
  }

  public toggleFavoriteStateOfHotelForUser(userId: number, hotelId: number): FavoriteEntity {
    const hotelUserState = this._favoriteHotelStateLoaderService.loadUserStateOfHotel(userId, hotelId);
    if (!hotelUserState) {
      return;
    }
    const updatedHotelFavoriteState = hotelUserState.toggleFavoriteStateOfHotel();
    return this._favoriteHotelStateUpdaterService.saveUserHotelState(updatedHotelFavoriteState);
  }
}
