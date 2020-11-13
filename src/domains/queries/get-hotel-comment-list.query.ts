import { CommentEntity } from '../entities';
import { ICommentSorting } from '../interfaces';


export interface GetHotelCommentListQuery {
  getHotelCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]>;
}
