import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { CommentEntity, RatingEntity } from 'domains/entities';
import { ICommentSorting } from 'domains/interfaces';
import {
  LoadHotelCommentListPort,
  SaveHotelCommentPort,
  SaveRatingPort,
} from 'domains/ports';
import { CommentOrmEntity, CommentViewMapper, CommentViewOrmEntity, RatingOrmEntity } from 'modules/adapters';


@Injectable()
export class CommentAdapterService implements
  LoadHotelCommentListPort,
  SaveHotelCommentPort,
  SaveRatingPort {
  constructor(
    @InjectConnection() private readonly _connection: Connection,
    @InjectRepository(CommentViewOrmEntity) private readonly _commentWithRatingRepository: Repository<CommentViewOrmEntity>,
    @InjectRepository(CommentOrmEntity) private readonly _commentRepository: Repository<CommentOrmEntity>,
    @InjectRepository(RatingOrmEntity) private readonly _ratingRepository: Repository<RatingOrmEntity>
  ) {}

  public async loadHotelCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]> {
    const commentWithRatingOrmEntities: CommentViewOrmEntity[] = await this._commentWithRatingRepository.find({
      where: {
        hotelId: commentSortingParams.hotelId
      }
    });
    return commentWithRatingOrmEntities.map((commentWithRatingOrmEntity: CommentViewOrmEntity) => CommentViewMapper.mapToDomain(commentWithRatingOrmEntity));
  }

  public async saveRating(entity: RatingEntity): Promise<RatingEntity> {
    const ratingOrmEntity: RatingOrmEntity = this._ratingRepository.create(entity);
    const isExistedEntity = await this._ratingRepository.hasId(ratingOrmEntity);
    if (isExistedEntity) {
      await this._ratingRepository.update(ratingOrmEntity, ratingOrmEntity);
    } else {
      await this._ratingRepository.save(ratingOrmEntity);
    }
    return entity;
  }

  public async saveHotelComment(commentEntity: CommentEntity): Promise<CommentEntity> {
    const queryRunner = await this._connection.createQueryRunner();
    await queryRunner.startTransaction();

    const ratingOrmEntity = this._ratingRepository.create({
      value: commentEntity.rating,
      userId: commentEntity.userId,
      hotelId: commentEntity.hotelId,
    });

    const hasRatingEntity = this._ratingRepository.hasId(ratingOrmEntity);
    if (hasRatingEntity) {
      await queryRunner.manager.update(
        RatingOrmEntity,
        {
          userId: commentEntity.userId,
          hotelId: commentEntity.hotelId,
        },
        ratingOrmEntity
      );
    } else {
      await queryRunner.manager.save(ratingOrmEntity);
    }
    await queryRunner.manager.createQueryBuilder()
      .insert()
      .into(CommentOrmEntity)
      .values({
        id: commentEntity.id,
        hotel: {
          id: commentEntity.hotelId,
        },
        user: {
          id: commentEntity.userId,
        },
        text: commentEntity.text,
        createdAt: commentEntity.createdAt,

      })
      .execute();
    await queryRunner.commitTransaction();
    return commentEntity;
  }
}
