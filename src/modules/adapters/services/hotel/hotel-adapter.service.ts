import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HotelEntity } from 'domains/entities';
import {
  ESortingType,
  IHotelSortingParams,
} from 'domains/interfaces';
import {
  LoadHotelByIdPort,
  LoadHotelListPort,
} from 'domains/ports';
import { HotelMapper } from 'modules/adapters/mappers';
import {
  CityOrmEntity,
  CommentOrmEntity,
  FavoriteOrmEntity,
  HotelOrmEntity,
  ImageOrmEntity,
  LocationOrmEntity,
  RatingOrmEntity,
  UserOrmEntity,
  UserTypeOrmEntity,
} from 'modules/adapters/orm-entities';
import {
  EOrderType,
  IOrderParams,
} from './hotel-adapter.interface';
import { ESortingFilter } from 'domains/interfaces/hotel-sorting.interface';


@Injectable()
export class HotelAdapterService implements LoadHotelListPort,
  LoadHotelByIdPort {
  private readonly _hotelOrderParamsMap = new Map<ESortingType, IOrderParams>([
    [ESortingType.POPULAR, {
      condition: `COALESCE(comments.count * rating.value, 0)`,
      type: EOrderType.DESC,
    }],
    [ESortingType.RATING, {
      condition: `COALESCE(rating.value, 0)`,
      type: EOrderType.DESC,
    }],
    [ESortingType.HIGH_PRICE, {
      condition: `hotels.price`,
      type: EOrderType.DESC,
    }],
    [ESortingType.LOW_PRICE, {
      condition: `hotels.price`,
      type: EOrderType.ASC,
    }],
  ]);

  constructor(
    @InjectRepository(HotelOrmEntity) private readonly _hotelRepository: Repository<HotelOrmEntity>,
    @InjectRepository(RatingOrmEntity) private readonly _ratingRepository: Repository<RatingOrmEntity>,
  ) {
  }

  public async loadHotelById(id: string): Promise<HotelEntity> {
    const hotelOrmEntity = await this.getHotelList({ hotelId: id });
    return hotelOrmEntity[0] ? HotelMapper.mapToDomain(hotelOrmEntity[0]) : null;
  }

  public async loadHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]> {
    const hotelOrmEntities: HotelOrmEntity[] = await this.getHotelList(sortParams);
    return hotelOrmEntities.map((hotelOrmEntity: HotelOrmEntity) => HotelMapper.mapToDomain(hotelOrmEntity));
  }

  public async findHotelByIds(hotelIds: string[]): Promise<HotelEntity[]> {
    const favoritesHotelOrmEntities: HotelOrmEntity[] = await this._hotelRepository.findByIds(hotelIds);
    const favoritesHotelOrmEntitiesWithRating = await this.getHotelsWithRatingByIds(favoritesHotelOrmEntities);
    return favoritesHotelOrmEntitiesWithRating.map(
      (favoritesHotelOrmEntity: HotelOrmEntity) => HotelMapper.mapToDomain(favoritesHotelOrmEntity),
    );
  }

  public async getHotelsWithRatingByIds(hotelOrmEntities: HotelOrmEntity[]): Promise<HotelOrmEntity[]> {
    const hotelIds = hotelOrmEntities.map((hotelOrmEntity: HotelEntity) => hotelOrmEntity.id);
    const ratings = await this._ratingRepository.createQueryBuilder()
      .select(`ratings.hotelId`, `hotelId`)
      .addSelect(`CAST(ROUND(AVG(ratings.value), 1) AS float)`, `value`)
      .from(RatingOrmEntity, `ratings`)
      .where(`ratings.hotelId IN (:...hotelIds)`, { hotelIds })
      .groupBy(`ratings."hotelId"`)
      .execute();
    return hotelOrmEntities.map((hotelOrmEntity: HotelOrmEntity) => {
      const ratingOrmEntity = ratings.find(rating => rating.hotelId === hotelOrmEntity.id);
      hotelOrmEntity.rating = ratingOrmEntity && ratingOrmEntity.value || 0;
      return hotelOrmEntity;
    });
  }

  public async getHotelList(sortParams: IHotelSortingParams): Promise<HotelOrmEntity[]> {
    const { cityId, hotelId, type = ESortingType.POPULAR, filter, userId } = sortParams;
    const orderParams = this._hotelOrderParamsMap.get(type);
    // const userId = `07bda126-335a-4ccf-be00-85d0fd57617a`;

    return this._hotelRepository
      .createQueryBuilder(`hotels`)
      .select([
        `hotels.id AS id`,
        `hotels.title AS title`,
        `hotels.description AS description`,
        `hotels.bedroomCount AS "bedroomCount"`,
        `hotels.maxAdultCount AS "maxAdultCount"`,
        `hotels.price AS price`,
        `hotels.isPremium AS "isPremium"`,
        `hotels.createdAt AS "createdAt"`,
        `images.list AS images`,
        `features.list AS features`,
        `COALESCE(rating.value, 0) AS rating`,
        `types.value AS type`,
        `cities.value AS city`,
        `locations.value AS location`,
        `users.value AS host`,
        `favorites IS NOT NULL AS "isFavorite"`,
      ])
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `hotels.id AS "hotelId"`,
            `COALESCE(JSON_AGG(features) FILTER (WHERE features IS NOT NULL), '[]') AS list`,
          ])
          .from(HotelOrmEntity, `hotels`)
          .leftJoin(`hotels.features`, `features`)
          .groupBy(`hotels.id`);
      }, `features`, `"features"."hotelId" = hotels.id`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `hotels.id AS "hotelId"`,
            `COALESCE(JSON_AGG(images) FILTER (WHERE images IS NOT NULL), '[]') AS list`,
          ])
          .from(HotelOrmEntity, `hotels`)
          .leftJoin(`hotels.images`, `images`)
          .groupBy(`hotels.id`);
      }, `images`, `"images"."hotelId" = hotels.id`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `ratings."hotelId" AS "hotelId"`,
            `CAST(ROUND(AVG(ratings.value), 1) AS float) AS value`,
          ])
          .from(RatingOrmEntity, `ratings`)
          .groupBy(`ratings.hotelId`);
      }, `rating`, `"rating"."hotelId" = hotels.id`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `hotels.id AS "hotelId"`,
            `TO_JSON(types) AS value`,
          ])
          .from(HotelOrmEntity, `hotels`)
          .leftJoin(`hotels.type`, `types`);
      }, `types`, `types."hotelId" = hotels.id`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `cities.id AS id`,
            `JSON_BUILD_OBJECT(
              'id', cities.id,
              'title', cities.title,
              'location', TO_JSON(locations)
            ) AS value`,
          ])
          .from(CityOrmEntity, `cities`)
          .leftJoin(`cities.location`, `locations`, `cities.locationId = locations.id`);
      }, `cities`, `cities.id = hotels.cityId`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `locations.id AS id`,
            `TO_JSON(locations) AS value`,
          ])
          .from(LocationOrmEntity, `locations`);
      }, `locations`, `locations.id = hotels.locationId`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `users.id AS id`,
            `JSON_BUILD_OBJECT(
              'id', users.id,
              'name', users.name,
              'password', users.password,
              'image', TO_JSON(images),
              'type', TO_JSON(types)
            ) AS value`,
          ])
          .from(UserOrmEntity, `users`)
          .leftJoin(ImageOrmEntity, `images`, `images.id = users.imageId`)
          .leftJoin(UserTypeOrmEntity, `types`, `types.id = users.typeId`);
      }, `users`, `users.id = hotels."hostId"`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `comments.hotelId AS "hotelId"`,
            `COUNT(comments)AS count`,
          ])
          .from(CommentOrmEntity, `comments`)
          .groupBy(`comments."hotelId"`);
      }, `comments`, `comments."hotelId" = hotels.id`)
      .leftJoin((subQuery) => {
        return subQuery
          .from(FavoriteOrmEntity, `favorites`)
          .where(userId ? `favorites."userId" = :userId` : `FALSE`, {userId})
      }, `favorites`, `favorites."hotelId" = hotels.id`)
      .where(cityId ? `hotels.cityId = :cityId` : `TRUE`, { cityId })
      .andWhere(hotelId ? `hotels.id = :hotelId` : `TRUE`, { hotelId })
      .andWhere(filter === ESortingFilter.FAVORITE ? `favorites IS NOT NULL` : `TRUE`)
      .orderBy(orderParams.condition, orderParams.type)
      .getRawMany();
  }
}
