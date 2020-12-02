import { Module } from '@nestjs/common';

import { AdapterModule } from 'modules/adapters';

import { CommentController } from './comment.controller';
import { CommentControllerService } from './comment-controller.service';


@Module({
  imports: [
    AdapterModule,
  ],
  controllers: [
    CommentController,
  ],
  providers: [
    CommentControllerService,
  ],
})
export class CommentModule {}
