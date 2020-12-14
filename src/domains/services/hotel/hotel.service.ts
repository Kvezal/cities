import { HotelEntity } from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';
import {
  LoadHotelByIdPort,
  LoadHotelListPort,
  LoadUserByIdPort,
  UpdateHotelPort,
} from 'domains/ports';
import {
  GetHotelByIdQuery,
  GetHotelListQuery,
} from 'domains/queries';
import { ESortingFilter } from 'domains/interfaces/hotel-sorting.interface';
import { ToggleHotelFavoriteStateUseCase } from 'domains/use-cases';
import {
  EHotelField,
  HotelException,
} from 'domains/exceptions/hotel';
import {
  EUserField,
  UserError,
} from 'domains/exceptions';


export class HotelService implements
  GetHotelListQuery,
  GetHotelByIdQuery,
  ToggleHotelFavoriteStateUseCase {
  constructor(
    private readonly _hotelListLoaderService: LoadHotelListPort,
    private readonly _hotelLoaderService: LoadHotelByIdPort,
    private readonly _userLoaderService: LoadUserByIdPort,
    private readonly _hotelUpdaterService: UpdateHotelPort
  ) {}

  public async getHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]> {
    if (sortParams.filter !== ESortingFilter.NEARBY) {
      return this._hotelListLoaderService.loadHotelList(sortParams);
    }
    const hotelEntity = await this.getHotelById(sortParams.hotelId);
    if (!hotelEntity) {
      return;
    }
    const hotelEntityList = await this._hotelListLoaderService.loadHotelList({
      ...sortParams,
      cityId: hotelEntity.city.id,
    });
    return hotelEntity.getNearbyHotelList(hotelEntityList);
  }

  public async getHotelById(hotelId: string): Promise<HotelEntity> {
    const hotelEntity = await this._hotelLoaderService.loadHotelById(hotelId);
    if (!hotelEntity) {
      throw new HotelException({
        field: EHotelField.ID,
        message: `Hotel with ${hotelId} id doesn't exist`,
      })
    }
    return hotelEntity;
  }

  public async toggleHotelFavoriteState(userId: string, hotelId: string): Promise<HotelEntity> {
    const hotel = await this.getHotelById(hotelId);
    if (!hotel) {
      throw new HotelException({
        field: EHotelField.ID,
        message: `Hotel with ${hotelId} doesn't exist`,
      });
    }
    const user = await this._userLoaderService.loadUserById(userId);
    if (!user) {
      throw new UserError({
        field: EUserField.ID,
        message: `User with ${userId} doesn't exist`,
      });
    }
    hotel.toggleFavorite(user);
    return await this._hotelUpdaterService.updateHotel(hotel);
  }
}
