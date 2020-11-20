import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoadFavoriteHotelListPort, LoadUserStateOfHotelPort, SaveUserHotelStatePort } from 'domains/ports';
import { FavoriteEntity, HotelEntity } from 'domains/entities';
import { FavoriteOrmEntity } from 'modules/orm-entities';


export class FavoriteAdapterService implements
  LoadFavoriteHotelListPort,
  LoadUserStateOfHotelPort,
  SaveUserHotelStatePort {
  constructor(
    @InjectRepository(FavoriteOrmEntity) private _userRepository: Repository<FavoriteOrmEntity>
  ) {}

  public async loadUserStateOfHotel(userId: string, hotelId: string): Promise<FavoriteEntity> {
    // const eee = new FavoriteOrmEntity();
    // eee.user = userId;
    // eee.hotel = hotelId;
    // eee.value = true;
    // await this._userRepository.insert(eee);
    const ormEntity = await this._userRepository.find();

    console.log(ormEntity);
    return null;
  }

  public async loadFavoriteHotelList(userId: string): Promise<HotelEntity[]> {
    return null;
  }

  public async saveUserHotelState(favoriteEntity: FavoriteEntity): Promise<FavoriteEntity> {
    return null;
  }
}
