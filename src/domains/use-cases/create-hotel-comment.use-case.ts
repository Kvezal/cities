import { CommentEntity } from 'domains/entities';
import { IHotelCommentParams } from 'domains/interfaces';


export interface CreateHotelCommentUseCase {
  createHotelComment(commentParams: IHotelCommentParams): Promise<CommentEntity>;
}
