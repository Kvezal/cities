import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';

import { CommentViewOrmEntity } from 'modules/adapters';
import { IRequest } from 'modules/api/middlewares';

import { JsonWebTokenExceptionFilter } from '../../filters';
import { EApiRouteName } from '../api-route-names.enum';
import { CommentDto } from './comment.dto';
import { CommentControllerService } from './comment-controller.service';


@Controller(EApiRouteName.COMMENT)
export class CommentController {
  constructor(
    private readonly _commentControllerService: CommentControllerService
  ) {}

  @Post()
  @UseFilters(JsonWebTokenExceptionFilter)
  @HttpCode(HttpStatus.OK)
  public async createHotelComment(
    @Body(ValidationPipe) body: CommentDto,
    @Req() request: IRequest
  ): Promise<CommentViewOrmEntity> {
    return this._commentControllerService.createHotelComment({
      ...body,
      userId: request.locals.userId
    });
  }
}
