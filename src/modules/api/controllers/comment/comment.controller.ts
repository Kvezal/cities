import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { IRequest } from 'modules/api/middlewares';

import { EApiRouteName } from '../api-route-names.enum';
import { CommentDto } from './comment.dto';
import { ICommentOut } from './comment.interface';
import { CommentControllerService } from './comment-controller.service';


@Controller(EApiRouteName.COMMENT)
export class CommentController {
  constructor(
    private readonly _commentControllerService: CommentControllerService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getHotelCommentList(
    @Query(`hotelId`) hotelId: string
  ): Promise<ICommentOut[]> {
    return this._commentControllerService.getHotelCommentList({hotelId});
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  public async createHotelComment(
    @Body(ValidationPipe) body: CommentDto,
    @Req() request: IRequest
  ): Promise<ICommentOut> {
    return this._commentControllerService.createHotelComment({
      ...body,
      userId: request.locals.userId
    });
  }
}
