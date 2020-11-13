import { CommentEntity } from '../entities';
import { IHotelCommentParams } from '../interfaces';


export interface CreateHotelCommentUseCase {
  createHotelComment(commentParams: IHotelCommentParams): Promise<CommentEntity>;
}
