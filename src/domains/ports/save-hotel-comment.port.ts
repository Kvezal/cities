import { CommentEntity } from 'domains/entities';


export interface SaveHotelCommentPort {
  saveHotelComment(commentEntity: CommentEntity): Promise<CommentEntity>;
}
