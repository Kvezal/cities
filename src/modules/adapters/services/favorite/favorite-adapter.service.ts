import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  DeleteUserHotelStatePort,
  LoadFavoriteHotelListPort,
  LoadUserStateOfHotelPort,
  SaveUserHotelStatePort,
} from 'domains/ports';
import { FavoriteEntity, HotelEntity } from 'domains/entities';
import { FavoriteMapper, FavoriteOrmEntity } from 'modules/adapters';

import { HotelAdapterService } from '../hotel';


@Injectable()
export class FavoriteAdapterService implements
  LoadFavoriteHotelListPort,
  LoadUserStateOfHotelPort,
  SaveUserHotelStatePort,
  DeleteUserHotelStatePort {
  constructor(
    @InjectRepository(FavoriteOrmEntity) private readonly _favoriteRepository: Repository<FavoriteOrmEntity>,
    private readonly _hotelService: HotelAdapterService
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
    return this._hotelService.findHotelByIds(hotelIds);
  }

  public async saveUserHotelState(favoriteEntity: FavoriteEntity): Promise<FavoriteEntity> {
    const newFavoriteOrmEntity = await this._favoriteRepository.create(FavoriteMapper.mapToOrmEntity(favoriteEntity));
    const savedFavoriteOrmEntity = await this._favoriteRepository.save(newFavoriteOrmEntity);
    return FavoriteMapper.mapToDomain(savedFavoriteOrmEntity);
  }

  public async deleteUserHotelState(favoriteEntity: FavoriteEntity): Promise<void> {
    await this._favoriteRepository.delete({
      userId: favoriteEntity.userId,
      hotelId: favoriteEntity.hotelId,
    });
  }
}
