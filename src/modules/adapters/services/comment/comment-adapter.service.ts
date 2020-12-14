import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from 'domains/entities';
import { ICommentSorting } from 'domains/interfaces';
import {
  LoadHotelCommentListPort,
  SaveHotelCommentPort,
} from 'domains/ports';

import {
  CommentOrmEntity,
  RatingOrmEntity,
  UserOrmEntity,
} from '../../orm-entities';
import { CommentViewMapper } from '../../mappers';
import { HotelAdapterService } from '../hotel';


@Injectable()
export class CommentAdapterService implements
  LoadHotelCommentListPort,
  SaveHotelCommentPort {
  constructor(
    private readonly _hotelAdapterService: HotelAdapterService,
    @InjectRepository(CommentOrmEntity) private readonly _commentRepository: Repository<CommentOrmEntity>
  ) {}

  public async loadHotelCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]> {
    const commentOrmEntities: CommentOrmEntity[] = await this.getCommentHotelList(commentSortingParams);
    return commentOrmEntities.map(
      (commentOrmEntity: CommentOrmEntity) => CommentViewMapper.mapToDomain(commentOrmEntity)
    );
  }

  public async saveHotelComment(entity: CommentEntity): Promise<CommentEntity> {
    const ormEntity = CommentViewMapper.mapToOrmEntity(entity);
    await this._commentRepository.save(ormEntity);
    return entity;
  }

  public async getCommentHotelList(commentSortingParams: ICommentSorting): Promise<CommentOrmEntity[]> {
    const { hotelId } = commentSortingParams;
    return await this._commentRepository
      .createQueryBuilder(`comments`)
      .select([
        `comments.id AS id`,
        `comments.text AS text`,
        `comments.createdAt AS createdAt`,
        `ratings.value AS rating`,
        `TO_JSON(hotels) AS hotel`,
        `TO_JSON(users) AS user`
      ])
      .leftJoin((subQuery) => {
        return this._hotelAdapterService.getHotelListQuery(
          subQuery,
          { hotelId }
        );
      }, `hotels`, `comments.hotelId = hotels.id`)
      .leftJoin((subQuery) => {
        return subQuery
          .select([
            `users.id AS id`,
            `users.name AS name`,
            `users.email AS email`,
            `TO_JSON(images) AS image`,
            `TO_JSON(types) AS type`
          ])
          .from(UserOrmEntity, `users`)
          .leftJoin(`users.image`, `images`)
          .leftJoin(`users.type`, `types`);
      }, `users`, `comments.userId = users.id`)
      .leftJoin(RatingOrmEntity, `ratings`, `comments.hotelId = ratings.hotelId AND comments.userId = ratings.userId`)
      .where(`comments.hotelId = :hotelId`, { hotelId })
      .orderBy(`comments.createdAt`, `DESC`)
      .getRawMany();
  }
}
