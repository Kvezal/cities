import { CommentEntity } from 'domains/entities';
import { ICommentSorting } from 'domains/interfaces';


export interface LoadCommentListPort {
  loadCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]>;
}
