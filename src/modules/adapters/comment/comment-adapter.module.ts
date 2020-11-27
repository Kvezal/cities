import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentService, commentServiceSymbol } from 'domains/services';
import { CommentOrmEntity, HotelOrmEntity, RatingOrmEntity, UserOrmEntity } from 'modules/orm-entities';
import { CommentViewOrmEntity } from 'modules/view-orm-entities';

import { CommentAdapterService } from './comment-adapter.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentViewOrmEntity,
      CommentOrmEntity,
      UserOrmEntity,
      HotelOrmEntity,
      RatingOrmEntity,
    ]),
  ],
  providers: [
    CommentAdapterService,
    {
      provide: commentServiceSymbol,
      useFactory: (commentAdapterService: CommentAdapterService) => new CommentService(
        commentAdapterService,
        commentAdapterService,
        commentAdapterService,
        commentAdapterService,
        commentAdapterService,
      ),
      inject: [CommentAdapterService],
    },
  ],
  exports: [commentServiceSymbol],
})
export class CommentAdapterModule {}
