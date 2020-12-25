import { Uuid } from 'domains/utils';

import { CommentEntity } from 'domains/entities';
import {
  CommentError,
  ECommentField,
} from 'domains/exceptions';
import {
  ICommentCreate,
  ICommentSorting,
} from 'domains/interfaces';
import {
  LoadHotelByIdPort,
  LoadCommentListPort,
  LoadUserByIdPort,
  SaveCommentPort,
} from 'domains/ports';
import { GetHotelCommentListQuery } from 'domains/queries';
import { CreateHotelCommentUseCase } from 'domains/use-cases';


export class CommentService implements
  GetHotelCommentListQuery,
  CreateHotelCommentUseCase {
  constructor(
    private readonly _hotelCommentLoaderService: LoadCommentListPort,
    private readonly _hotelCommentSaverService: SaveCommentPort,
    private readonly _userLoaderService: LoadUserByIdPort,
    private readonly _hotelLoaderService: LoadHotelByIdPort
  ) {}


  public async getHotelCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]> {
    return this._hotelCommentLoaderService.loadCommentList(commentSortingParams);
  }


  public async createHotelComment(commentParams: ICommentCreate): Promise<CommentEntity> {
    const userEntity = await this._userLoaderService.loadUserById(commentParams.userId);
    if (!userEntity) {
      throw new CommentError({
        field: ECommentField.USER_ID,
        message: `user with ${commentParams.userId} id is not existed`,
      });
    }

    const hotelEntity = await this._hotelLoaderService.loadHotelById(commentParams.hotelId);
    if (!hotelEntity) {
      throw new CommentError({
        field: ECommentField.HOTEL_ID,
        message: `hotel with ${commentParams.hotelId} id is not existed`,
      });
    }
    const commentEntity = CommentEntity.create({
      id: Uuid.generate(),
      text: commentParams.text,
      hotelId: commentParams.hotelId,
      user: userEntity,
      rating: commentParams.rating,
      createdAt: new Date(),
    });
    return this._hotelCommentSaverService.saveComment(commentEntity);
  }
}
