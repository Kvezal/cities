import { CommentEntity } from '../entities';


export interface SaveHotelCommentPort {
  saveHotelComment(commentEntity: CommentEntity): Promise<CommentEntity>;
}
