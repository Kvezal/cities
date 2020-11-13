import { CommentEntity } from '../entities';
import { ICommentSorting } from '../interfaces';


export interface LoadHotelCommentListPort {
  loadHotelCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]>;
}
