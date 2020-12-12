import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  DeleteUserHotelStatePort,
  LoadUserStateOfHotelPort,
  SaveUserHotelStatePort,
} from 'domains/ports';
import { FavoriteEntity } from 'domains/entities';
import {
  FavoriteMapper,
  FavoriteOrmEntity,
} from 'modules/adapters';

import { HotelAdapterService } from '../hotel';


@Injectable()
export class FavoriteAdapterService implements
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
