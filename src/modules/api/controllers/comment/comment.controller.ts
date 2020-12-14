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
import {
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { IRequest } from 'modules/api/middlewares';
import {
  CommentDto,
  CommentOutput,
} from 'modules/api/interfaces';

import { EApiRouteName } from '../api-route-names.enum';
import { CommentControllerService } from './comment-controller.service';


@ApiTags(`Comment`)
@Controller(EApiRouteName.COMMENT)
export class CommentController {
  constructor(
    private readonly _commentControllerService: CommentControllerService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: `hotelId`,
    description: `lets to get comments for selected hotel id`,
    required:  false,
    example: `023dda52-f07b-47ef-a44c-2301f8743149`,
  })
  @ApiOkResponse({
    description: `should return hotel comments`,
    type: CommentOutput,
    isArray: true,
  })
  public async getHotelCommentList(
    @Query(`hotelId`) hotelId: string
  ): Promise<CommentOutput[]> {
    return this._commentControllerService.getHotelCommentList({ hotelId });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createHotelComment(
    @Body(ValidationPipe) body: CommentDto,
    @Req() request: IRequest
  ): Promise<CommentOutput> {
    return this._commentControllerService.createHotelComment({
      ...body,
      userId: request.locals.userId
    });
  }
}
