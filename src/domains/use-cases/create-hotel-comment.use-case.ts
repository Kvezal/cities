import { CommentEntity, IComment } from 'domains/entities';


export interface CreateHotelCommentUseCase {
  createHotelComment(commentParams: IComment): Promise<CommentEntity>;
}
