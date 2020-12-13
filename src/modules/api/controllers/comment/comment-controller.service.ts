import {
  Inject,
  Injectable,
} from '@nestjs/common';

import {
  CommentEntity,
  IComment,
} from 'domains/entities';
import {
  CommentService,
  commentServiceSymbol,
} from 'domains/services';
import {
  CommentViewMapper,
  CommentViewOrmEntity,
} from 'modules/adapters';


@Injectable()
export class CommentControllerService {
  constructor(
    @Inject(commentServiceSymbol) private readonly _commentService: CommentService
  ) {}

  public async createHotelComment(params: IComment): Promise<CommentViewOrmEntity> {
    const commentEntity: CommentEntity = await this._commentService.createHotelComment(params);
    return CommentViewMapper.mapToOrmEntity(commentEntity)
  }
}
