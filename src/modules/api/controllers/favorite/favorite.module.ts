import { Module } from '@nestjs/common';

import { AdapterModule } from 'modules/adapters';

import { FavoriteController } from './favorite.controller';
import { FavoriteControllerService } from './favorite-controller.service';


@Module({
  imports: [
    AdapterModule,
  ],
  controllers: [
    FavoriteController,
  ],
  providers: [
    FavoriteControllerService,
  ],
})
export class FavoriteModule {}
