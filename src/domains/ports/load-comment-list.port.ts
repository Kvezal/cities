import { CommentEntity } from '../entities/comment';


export interface LoadCommentListPort {
  loadCommentListPort(): CommentEntity[];
}
