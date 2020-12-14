import { IUserOutput } from 'modules/api/interfaces';


export interface ICommentOut {
  id: string,
  text: string,
  createdAt: Date,
  rating: number,
  user: IUserOutput,
}