import { CommentEntity } from 'domains/entities';
import { ICommentSorting } from 'domains/interfaces';


export interface LoadHotelCommentListPort {
  loadHotelCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]>;
}
