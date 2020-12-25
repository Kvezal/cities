import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { CommentEntity } from 'domains/entities';
import { ICommentSorting } from 'domains/interfaces';
import {
  LoadCommentListPort,
  SaveCommentPort,
} from 'domains/ports';
import { CommentsDbTable } from 'modules/db';

import { CommentMapper } from '../../mappers';


@Injectable()
export class CommentAdapterService implements LoadCommentListPort,
  SaveCommentPort {
  constructor(
    @Inject(CommentsDbTable) private readonly _commentsDbTable: CommentsDbTable,
  ) {
  }

  public async loadCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]> {
    const comments = await this._commentsDbTable.findAll({
      hotel_id: commentSortingParams.hotelId,
    });
    return comments.map(
      (commentOrmEntity) => CommentMapper.mapToDomain(commentOrmEntity),
    );
  }

  public async saveComment(comment: CommentEntity): Promise<CommentEntity> {
    const tableComment = CommentMapper.mapToTableParams(comment);
    const createdTableEntity = await this._commentsDbTable.createOne(tableComment);
    return CommentMapper.mapToDomain(createdTableEntity);
  }
}
