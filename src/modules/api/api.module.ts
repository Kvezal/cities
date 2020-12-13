import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule, CityModule, CommentModule, FavoriteModule, HotelModule } from './controllers';
import { APP_FILTER } from '@nestjs/core';
import { JsonWebTokenExceptionFilter } from 'modules/api/filters';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(process.cwd(), `./src/public`),
    }),
    AuthModule,
    CityModule,
    CommentModule,
    FavoriteModule,
    HotelModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: JsonWebTokenExceptionFilter,
    }
  ],
})
export class ApiModule {}
