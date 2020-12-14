import { CommentEntity } from 'domains/entities';
import { ICommentCreate } from 'domains/interfaces';


export interface CreateHotelCommentUseCase {
  createHotelComment(commentParams: ICommentCreate): Promise<CommentEntity>;
}
