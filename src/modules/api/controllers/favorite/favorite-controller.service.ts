import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { HotelEntity } from 'domains/entities';
import {
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
    @Inject(hotelServiceSymbol) private readonly _hotelService: HotelService
  ) {}

  public async toggleFavoriteStatus(userId: string, hotelId: string): Promise<HotelOrmEntity> {
    const hotelEntity: HotelEntity = await this._hotelService.toggleHotelFavoriteState(userId, hotelId);
    return HotelMapper.mapToOrmEntity(hotelEntity);
  }
}
