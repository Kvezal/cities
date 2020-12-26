import {
  Body,
  Controller,
  Get,
  Head,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Request,
  Response,
} from 'express';

import {
  AuthLoginDto,
  JsonWebTokenParams,
} from 'modules/api/interfaces';

import {
  Filter,
  JsonWebTokenExceptionFilter,
} from '../../filters';
import { EApiRouteName } from '../api-route-names.enum';
import { AuthControllerService } from './auth-controller.service';
import { IRequest } from 'modules/api/middlewares';


@ApiTags(`Auth`)
@Controller(EApiRouteName.AUTH)
export class AuthController {
  constructor(
    private readonly _authControllerService: AuthControllerService,
  ) {}


  @Post(`login`)
  @UseFilters(Filter)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: `User authorization`,
    headers: {
      'set-cookie': {
        description: `should return access and refresh token cookies`,
        required: true,
      },
    },
  })
  public async login(
    @Body(ValidationPipe) body: AuthLoginDto,
    @Res() response: Response
  ): Promise<void> {
    const jsonWebTokenEntity = await this._authControllerService.authenticateUser(body);
    this._authControllerService.setTokens(response, jsonWebTokenEntity);
    response.send();
  }


  @Head(`logout`)
  @UseFilters(JsonWebTokenExceptionFilter)
  @HttpCode(HttpStatus.RESET_CONTENT)
  @ApiResponse({
    description: `User logout`,
    headers: {
      'set-cookie': {
        description: `should reset access and refresh token cookies`,
        required: true,
      },
    },
  })
  public async logout(
    @Req() request: IRequest,
    @Res() response: Response
  ): Promise<void> {
    const refreshToken = request.cookies[`refresh-token`];
    await this._authControllerService.logout(refreshToken);
    this._authControllerService.resetTokens(response);
    response.send();
  }


  @Get(`decode`)
  @UseFilters(JsonWebTokenExceptionFilter)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: `should return decoded access token`,
    type: JsonWebTokenParams,
  })
  @ApiUnauthorizedResponse({description: `user is unauthorized`})
  @ApiCookieAuth(`accessToken`)
  @ApiHeader({
    name: `cookie`,
    description: `should contain access token or refresh one`
  })
  public async decode(
    @Req() request: Request
  ): Promise<JsonWebTokenParams> {
    const accessToken = request.cookies[`access-token`];
    return this._authControllerService.decodeAccessToken(accessToken);
  }


  @Post(`refresh`)
  @UseFilters(JsonWebTokenExceptionFilter)
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: `user authorization token updated`,
    headers: {
      'set-cookie': {
        description: `should return access and refresh cookies`,
        required: true,
      },
    },
  })
  @ApiUnauthorizedResponse({description: `user is unauthorized`})
  @ApiCookieAuth(`accessToken`)
  @ApiHeader({
    name: `cookie`,
    description: `should contain refresh token`
  })
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
