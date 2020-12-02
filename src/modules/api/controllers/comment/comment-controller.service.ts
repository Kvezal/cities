import { Inject, Injectable } from '@nestjs/common';

import { CommentViewMapper, CommentViewOrmEntity } from 'modules/adapters';
import { AuthService, authServiceSymbol, CommentService, commentServiceSymbol } from 'domains/services';

import { CommentDto } from './comment.dto';


@Injectable()
export class CommentControllerService {
  constructor(
    @Inject(commentServiceSymbol) private readonly _commentService: CommentService,
    @Inject(authServiceSymbol) private readonly _authService: AuthService
  ) {}

  public async createHotelComment(params: CommentDto, accessToken: string): Promise<CommentViewOrmEntity> {
    const userParams = await this._authService.decodeAccessToken(accessToken);
    const commentEntity = await this._commentService.createHotelComment({
      ...params,
      userId: userParams.id,
    });
    return CommentViewMapper.mapToOrmEntity(commentEntity)
  }
}
