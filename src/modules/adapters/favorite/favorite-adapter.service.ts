import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoadFavoriteHotelListPort, LoadUserStateOfHotelPort, SaveUserHotelStatePort } from 'domains/ports';
import { FavoriteEntity, HotelEntity } from 'domains/entities';
import { FavoriteOrmEntity, HotelOrmEntity } from 'modules/orm-entities';
import { FavoriteMapper, HotelMapper } from 'modules/mappers';


export class FavoriteAdapterService implements
  LoadFavoriteHotelListPort,
  LoadUserStateOfHotelPort,
  SaveUserHotelStatePort {
  constructor(
    @InjectRepository(FavoriteOrmEntity) private readonly _favoriteRepository: Repository<FavoriteOrmEntity>,
    @InjectRepository(HotelOrmEntity) private readonly _hotelRepository: Repository<HotelOrmEntity>
  ) {}

  public async loadUserStateOfHotel(userId: string, hotelId: string): Promise<FavoriteEntity> {
    const ormEntity = await this._favoriteRepository.findOne(
      {
        userId,
        hotelId,
      },
      {
        loadRelationIds: true,
      }
    );
    return ormEntity && FavoriteMapper.mapToDomain(ormEntity);
  }

  public async loadFavoriteHotelList(userId: string): Promise<HotelEntity[]> {
    const favoriteOrmEntities = await this._favoriteRepository.find({
      loadRelationIds: true,
      where: { userId },
    });
    if (favoriteOrmEntities.length === 0) {
      return [];
    }
    const hotelIds = favoriteOrmEntities.map((favoriteOrmEntity: FavoriteOrmEntity) => favoriteOrmEntity.hotelId);
    const hotelOrmEntities: HotelOrmEntity[] = await this._hotelRepository.findByIds(hotelIds);
    return hotelOrmEntities.map((hotelOrmEntity: HotelOrmEntity) => HotelMapper.mapToDomain(hotelOrmEntity));
  }

  public async saveUserHotelState(favoriteEntity: FavoriteEntity): Promise<FavoriteEntity> {
    if (favoriteEntity.value) {
      const newFavoriteOrmEntity = await this._favoriteRepository.create(FavoriteMapper.mapToOrmEntity(favoriteEntity));
      const savedFavoriteOrmEntity = await this._favoriteRepository.save(newFavoriteOrmEntity);
      return FavoriteMapper.mapToDomain(savedFavoriteOrmEntity);
    }
    await this._favoriteRepository.delete({
      userId: favoriteEntity.userId,
      hotelId: favoriteEntity.hotelId,
    });
  }
}
