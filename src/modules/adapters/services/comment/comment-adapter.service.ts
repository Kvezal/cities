import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from 'domains/entities';
import { ICommentSorting } from 'domains/interfaces';
import {
  LoadHotelCommentListPort,
  SaveHotelCommentPort,
} from 'domains/ports';

import { CommentOrmEntity } from '../../orm-entities';
import { CommentViewMapper } from '../../mappers';
import { CommentViewOrmEntity } from '../../view-orm-entities';


@Injectable()
export class CommentAdapterService implements
  LoadHotelCommentListPort,
  SaveHotelCommentPort {
  constructor(
    @InjectRepository(CommentViewOrmEntity) private readonly _commentWithRatingRepository: Repository<CommentViewOrmEntity>,
    @InjectRepository(CommentOrmEntity) private readonly _commentRepository: Repository<CommentOrmEntity>
  ) {}

  public async loadHotelCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]> {
    const commentWithRatingOrmEntities: CommentViewOrmEntity[] = await this._commentWithRatingRepository.find({
      where: {
        hotelId: commentSortingParams.hotelId
      }
    });
    return commentWithRatingOrmEntities.map((commentWithRatingOrmEntity: CommentViewOrmEntity) => CommentViewMapper.mapToDomain(commentWithRatingOrmEntity));
  }

  public async saveHotelComment(entity: CommentEntity): Promise<CommentEntity> {
    const ormEntity = CommentViewMapper.mapToOrmEntity(entity);
    await this._commentRepository.save(ormEntity);
    return entity;
  }
}
