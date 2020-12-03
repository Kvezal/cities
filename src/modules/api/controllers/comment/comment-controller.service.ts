import { Inject, Injectable } from '@nestjs/common';

import { CommentEntity } from 'domains/entities';
import { AuthService, authServiceSymbol, CommentService, commentServiceSymbol } from 'domains/services';
import { CommentViewMapper, CommentViewOrmEntity } from 'modules/adapters';

import { CommentDto } from './comment.dto';


@Injectable()
export class CommentControllerService {
  constructor(
    @Inject(authServiceSymbol) private readonly _authService: AuthService,
    @Inject(commentServiceSymbol) private readonly _commentService: CommentService
  ) {}

  public async createHotelComment(params: CommentDto, accessToken: string): Promise<CommentViewOrmEntity> {
    const userParams = await this._authService.decodeAccessToken(accessToken);
    const commentEntity: CommentEntity = await this._commentService.createHotelComment({
      ...params,
      userId: userParams.id,
    });
    return CommentViewMapper.mapToOrmEntity(commentEntity)
  }
}
