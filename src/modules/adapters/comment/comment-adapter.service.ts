import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { CommentEntity, HotelEntity, RatingEntity, UserEntity } from 'domains/entities';
import { ICommentSorting } from 'domains/interfaces';
import {
  LoadHotelByIdPort,
  LoadHotelCommentListPort,
  LoadUserByIdPort,
  SaveHotelCommentPort, SaveRatingPort,
} from 'domains/ports';
import { CommentOrmEntity, HotelOrmEntity, RatingOrmEntity, UserOrmEntity } from 'modules/orm-entities';
import { CommentViewMapper, HotelMapper, UserMapper } from 'modules/mappers';
import { CommentViewOrmEntity } from 'modules/view-orm-entities';
import { RatingMapper } from 'modules/mappers/rating';


@Injectable()
export class CommentAdapterService implements
  LoadHotelCommentListPort,
  SaveHotelCommentPort,
  SaveRatingPort,
  LoadUserByIdPort,
  LoadHotelByIdPort {
  constructor(
    @InjectConnection() private readonly _connection: Connection,
    @InjectRepository(HotelOrmEntity) private readonly _hotelRepository: Repository<HotelOrmEntity>,
    @InjectRepository(UserOrmEntity) private readonly _userRepository: Repository<UserOrmEntity>,
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

  public async loadUserById(userId: string): Promise<UserEntity> {
    const userOrmEntity: UserOrmEntity = await this._userRepository.findOne(userId);
    return UserMapper.mapToDomain(userOrmEntity);
  }

  public async loadHotelById(hotelId: string): Promise<HotelEntity> {
    const hotelOrmEntity: HotelOrmEntity = await this._hotelRepository.findOne(hotelId);
    return HotelMapper.mapToDomain(hotelOrmEntity);
  }

  public async loadRating(userId: string, hotelId: string): Promise<RatingEntity> {
    const ratingOrmEntity: RatingOrmEntity = await this._ratingRepository.findOne({
      userId,
      hotelId,
    });
    return RatingMapper.mapToDomain(ratingOrmEntity);
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
