import { CommentEntity } from 'domains/entities';
import { ICommentSorting } from 'domains/interfaces';


export interface GetHotelCommentListQuery {
  getHotelCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]>;
}
