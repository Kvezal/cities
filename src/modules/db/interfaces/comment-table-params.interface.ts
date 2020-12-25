import { IUserTableParams } from './user-table-params.interface';


export interface ICommentTableParams {
  id: string;
  user: IUserTableParams;
  hotel_id: string
  text: string;
  rating: number;
  created_at?: string;
}
