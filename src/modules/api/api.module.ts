import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule, CityModule, CommentModule, FavoriteModule, HotelModule } from './controllers';


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
})
export class ApiModule {}
