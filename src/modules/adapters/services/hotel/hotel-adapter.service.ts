import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HotelEntity } from 'domains/entities';
import {
  ESortingFilter,
  ESortingType,
  IHotelSortingParams,
} from 'domains/interfaces';
import {
  LoadHotelByIdPort,
  LoadHotelListPort,
  UpdateHotelPort,
} from 'domains/ports';
import { HotelMapper } from 'modules/adapters/mappers';
import {
  CityOrmEntity,
  CommentOrmEntity,
  HotelOrmEntity,
  LocationOrmEntity,
  RatingOrmEntity,
  UserOrmEntity,
} from 'modules/adapters/orm-entities';
import {
  EOrderType,
  IOrderParams,
} from './hotel-adapter.interface';


@Injectable()
export class HotelAdapterService implements
  LoadHotelListPort,
  LoadHotelByIdPort,
  UpdateHotelPort {
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
    @InjectRepository(HotelOrmEntity) private readonly _hotelRepository: Repository<HotelOrmEntity>
  ) {
  }

  public async loadHotelById(id: string): Promise<HotelEntity> {
    const hotelOrmEntity = await this.getHotelList({ hotelId: id });
    return hotelOrmEntity[0] ? HotelMapper.mapToDomain(hotelOrmEntity[0]) : null;
  }

  public async loadHotelList(sortParams: IHotelSortingParams): Promise<HotelEntity[]> {
    const hotelOrmEntities: HotelOrmEntity[] = await this.getHotelList(sortParams);
    console.log(hotelOrmEntities);
    return hotelOrmEntities.map((hotelOrmEntity: HotelOrmEntity) => HotelMapper.mapToDomain(hotelOrmEntity));
  }

  public async updateHotel(hotelEntity: HotelEntity): Promise<HotelEntity> {
    return null;
  }

  public async getHotelList(sortParams: IHotelSortingParams): Promise<HotelOrmEntity[]> {
    const { cityId, hotelId, type = ESortingType.POPULAR, filter, userId /*= `2a4a6d1a-eb9b-4b4a-bee5-c7728b78001f`*/ } = sortParams;
    const orderParams = this._hotelOrderParamsMap.get(type);

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
        `favorites.list AS favorites`
      ])
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `hotels.id AS "hotelId"`,
            `COALESCE(
              JSON_AGG(features) FILTER (WHERE features IS NOT NULL),
              '[]'
            ) AS list`,
          ])
          .from(HotelOrmEntity, `hotels`)
          .leftJoin(`hotels.features`, `features`)
          .groupBy(`hotels.id`);
      }, `features`, `"features"."hotelId" = hotels.id`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `hotels.id AS "hotelId"`,
            `COALESCE(
              JSON_AGG(images) FILTER (WHERE images IS NOT NULL),
              '[]'
            ) AS list`,
          ])
          .from(HotelOrmEntity, `hotels`)
          .leftJoin(`hotels.images`, `images`)
          .groupBy(`hotels.id`);
      }, `images`, `"images"."hotelId" = hotels.id`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `ratings."hotelId" AS "hotelId"`,
            `CAST(
              ROUND(
                AVG(ratings.value),
                1
              ) AS float
            ) AS value`,
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
          .leftJoin(`users.image`, `images`)
          .leftJoin(`users.type`, `types`);
      }, `users`, `users.id = hotels."hostId"`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `comments.hotelId AS "hotelId"`,
            `COUNT(comments) AS count`,
          ])
          .from(CommentOrmEntity, `comments`)
          .groupBy(`comments."hotelId"`);
      }, `comments`, `comments."hotelId" = hotels.id`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `hotels.id AS "hotelId"`,
            `COALESCE(
              JSON_AGG(
                JSON_BUILD_OBJECT(
                  'id', users.id,
                  'name', users.name,
                  'password', users.password,
                  'image', TO_JSON(images),
                  'type', TO_JSON(types)
                )
              ) FILTER (WHERE users IS NOT NULL),
              '[]'
            ) AS list`,
          ])
          .from(HotelOrmEntity, `hotels`)
          .leftJoin(`hotels.favorites`, `users`)
          .leftJoin(`users.image`, `images`)
          .leftJoin(`users.type`, `types`)
          .groupBy(`hotels.id`);
      }, `favorites`, `favorites."hotelId" = hotels.id`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `hotels.id AS "hotelId"`,
          ])
          .from(HotelOrmEntity, `hotels`)
          .leftJoin(`hotels.favorites`, `users`)
          .where(`users.id = :userId`, {userId})
      }, `isFavorite`, `"isFavorite"."hotelId" = hotels.id`)
      .where(cityId ? `hotels.cityId = :cityId` : `TRUE`, { cityId })
      .andWhere(hotelId ? `hotels.id = :hotelId` : `TRUE`, { hotelId })
      .andWhere(filter === ESortingFilter.FAVORITE ? `"isFavorite" IS NOT NULL` : `TRUE`)
      .orderBy(orderParams.condition, orderParams.type)
      .getRawMany();
  }
}
