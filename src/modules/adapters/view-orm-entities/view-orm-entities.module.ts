import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentViewOrmEntity } from './comment.view-orm-entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentViewOrmEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class ViewOrmEntitiesModule {}
