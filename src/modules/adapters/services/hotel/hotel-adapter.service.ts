import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HotelEntity } from 'domains/entities';
import { IHotelSortingParams } from 'domains/interfaces';
import { LoadHotelByIdPort, LoadHotelListPort } from 'domains/ports';
import { HotelMapper } from 'modules/adapters/mappers';
import { HotelOrmEntity, RatingOrmEntity } from 'modules/adapters/orm-entities';


@Injectable()
export class HotelAdapterService implements
  LoadHotelListPort,
  LoadHotelByIdPort {
  constructor(
    @InjectRepository(HotelOrmEntity) private readonly _hotelRepository: Repository<HotelOrmEntity>,
    @InjectRepository(RatingOrmEntity) private readonly _ratingRepository: Repository<RatingOrmEntity>
  ) {}

  public async loadHotelById(id: string): Promise<HotelEntity> {
    const hotelOrmEntity: HotelOrmEntity = await this._hotelRepository.findOne(id);
    const hotelOrmEntitiesWithRating = await this.getHotelsWithRatingByIds([hotelOrmEntity]);
    return HotelMapper.mapToDomain(hotelOrmEntitiesWithRating[0]);
  }

  public async loadHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]> {
    const hotelOrmEntities: HotelOrmEntity[] = await this._hotelRepository.find({
      where: {
        city: {
          id: sortParams.cityId
        }
      }});
    const hotelOrmEntitiesWithRating = await this.getHotelsWithRatingByIds(hotelOrmEntities);
    return hotelOrmEntitiesWithRating.map((hotelOrmEntity: HotelOrmEntity) => HotelMapper.mapToDomain(hotelOrmEntity));
  }

  public async findHotelByIds(hotelIds: string[]): Promise<HotelEntity[]> {
    const favoritesHotelOrmEntities: HotelOrmEntity[] = await this._hotelRepository.findByIds(hotelIds);
    const favoritesHotelOrmEntitiesWithRating = await this.getHotelsWithRatingByIds(favoritesHotelOrmEntities);
    return favoritesHotelOrmEntitiesWithRating.map(
      (favoritesHotelOrmEntity: HotelOrmEntity) => HotelMapper.mapToDomain(favoritesHotelOrmEntity)
    );
  }

  public async getHotelsWithRatingByIds(hotelOrmEntities: HotelOrmEntity[]): Promise<HotelOrmEntity[]> {
    const hotelIds = hotelOrmEntities.map((hotelOrmEntity: HotelEntity) => hotelOrmEntity.id);
    const ratings = await this._ratingRepository.createQueryBuilder()
      .select(`ratings.hotelId`, `hotelId`)
      .addSelect(`CAST(ROUND(AVG(ratings.value), 1) AS float)`, `value`)
      .from(RatingOrmEntity, `ratings`)
      .where(`ratings.hotelId IN (:...hotelIds)`, {hotelIds})
      .groupBy(`ratings."hotelId"`)
      .execute();
    return hotelOrmEntities.map((hotelOrmEntity: HotelOrmEntity) => {
      const ratingOrmEntity = ratings.find(rating => rating.hotelId === hotelOrmEntity.id);
      hotelOrmEntity.rating = ratingOrmEntity && ratingOrmEntity.value || 0;
      return hotelOrmEntity
    });
  }
}
