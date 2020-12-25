import { CommentEntity } from 'domains/entities';


export interface SaveCommentPort {
  saveComment(commentEntity: CommentEntity): Promise<CommentEntity>;
}
