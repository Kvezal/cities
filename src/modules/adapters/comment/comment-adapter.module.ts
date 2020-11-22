import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentOrmEntity } from 'modules/orm-entities';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentOrmEntity
    ]),
  ],

})
export class CommentAdapterModule {}
