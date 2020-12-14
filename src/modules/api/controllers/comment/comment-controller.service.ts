import {
  Inject,
  Injectable,
} from '@nestjs/common';

import { CommentEntity } from 'domains/entities';
import {
  CommentService,
  commentServiceSymbol,
} from 'domains/services';
import {
  ICommentCreate,
  ICommentSorting,
} from 'domains/interfaces';

import { ICommentOut } from './comment.interface';


@Injectable()
export class CommentControllerService {
  constructor(
    @Inject(commentServiceSymbol) private readonly _commentService: CommentService
  ) {}

  public async getHotelCommentList(commentSortingParams: ICommentSorting): Promise<ICommentOut[]> {
    const commentEntities: CommentEntity[] = await this._commentService.getHotelCommentList(commentSortingParams);
    return commentEntities.map((commentEntity: CommentEntity) => this.transformEntityToOutputData(commentEntity));
  }

  public async createHotelComment(params: ICommentCreate): Promise<ICommentOut> {
    const commentEntity: CommentEntity = await this._commentService.createHotelComment(params);
    return this.transformEntityToOutputData(commentEntity);
  }

  public transformEntityToOutputData(commentEntity: CommentEntity): ICommentOut {
    return {
      id: commentEntity.id,
      text: commentEntity.text,
      createdAt: new Date(commentEntity.createdAt),
      rating: commentEntity.rating,
      user: {
        id: commentEntity.user.id,
        name: commentEntity.user.name,
        type: commentEntity.user.type.title,
        image: commentEntity.user.image.title,
      },
    };
  }
}
