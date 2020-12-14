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
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
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
  @ApiCookieAuth(`accessToken`)
  @ApiCreatedResponse({
    description: `should create hotel comments`,
    type: CommentOutput,
  })
  @ApiUnauthorizedResponse({description: `should return error if user unauthorized`})
  @ApiBadRequestResponse({ description: `should return bad request if parameters are invalid` })
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
