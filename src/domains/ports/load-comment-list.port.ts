import { CommentEntity } from 'domains/entities';


export interface LoadCommentListPort {
  loadCommentListPort(): Promise<CommentEntity[]>;
}
