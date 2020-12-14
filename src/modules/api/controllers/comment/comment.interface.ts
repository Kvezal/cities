import { IUserOut } from '../auth';


export interface ICommentOut {
  id: string,
  text: string,
  createdAt: Date,
  rating: number,
  user: IUserOut,
}