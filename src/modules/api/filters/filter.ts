import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Response, Request } from 'express';

import { Exception } from 'domains/exceptions';


@Catch(Exception)
export class Filter implements ExceptionFilter {
  catch(exception: Exception, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    return response
      .status(HttpStatus.BAD_REQUEST)
      .json({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: {
        field: exception.field,
        type: exception.type,
        description: exception.description,
        name: exception.name,
      }
    });
  }
}
