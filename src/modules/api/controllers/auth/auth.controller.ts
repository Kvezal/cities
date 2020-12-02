import {
  Body,
  Controller,
  Get,
  Head,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  ValidationPipe,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { IJsonWebTokenParams } from 'domains/entities';

import { Filter, JsonWebTokenExceptionFilter } from '../../filters';
import { EApiRouteName } from '../api-route-names.enum';
import { AuthLoginDto } from './auth.dto';
import { AuthControllerService } from './auth-controller.service';


@Controller(EApiRouteName.AUTH)
export class AuthController {
  constructor(
    private readonly _authControllerService: AuthControllerService,
  ) {}


  @Post(`login`)
  @UseFilters(Filter)
  @HttpCode(HttpStatus.CREATED)
  public async login(
    @Body(ValidationPipe) body: AuthLoginDto,
    @Res() response: Response
  ): Promise<void> {
    const jsonWebTokenEntity = await this._authControllerService.authenticateUser(body);
    this._authControllerService.setTokens(response, jsonWebTokenEntity);
    response.send();
  }


  @Head(`check`)
  @UseFilters(JsonWebTokenExceptionFilter)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async check(
    @Req() request: Request
  ): Promise<void> {
    const accessToken = request.cookies[`access-token`];
    await this._authControllerService.checkAccessToken(accessToken);
  }


  @Get(`decode`)
  @UseFilters(JsonWebTokenExceptionFilter)
  @HttpCode(HttpStatus.OK)
  public async decode(
    @Req() request: Request
  ): Promise<IJsonWebTokenParams> {
    const accessToken = request.cookies[`access-token`];
    return this._authControllerService.decodeAccessToken(accessToken);
  }


  @Post(`refresh`)
  @UseFilters(Filter)
  @HttpCode(HttpStatus.CREATED)
  public async refresh(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<void> {
    const refreshToken = request.cookies[`refresh-token`];
    const jsonWebTokenEntity = await this._authControllerService.refreshToken(refreshToken);
    this._authControllerService.setTokens(response, jsonWebTokenEntity);
    response.send();
  }
}
