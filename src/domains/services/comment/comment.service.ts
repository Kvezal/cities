import { CommentEntity } from 'domains/entities';
import { ICommentSorting, IHotelCommentParams } from 'domains/interfaces';
import { LoadHotelByIdPort, LoadHotelCommentListPort, LoadUserByIdPort, SaveHotelCommentPort } from 'domains/ports';
import { GetHotelCommentListQuery } from 'domains/queries';
import { CreateHotelCommentUseCase } from 'domains/use-cases';


export class CommentService implements
  GetHotelCommentListQuery,
  CreateHotelCommentUseCase {
  constructor(
    private readonly _hotelCommentLoaderService: LoadHotelCommentListPort,
    private readonly _hotelCommentSaverService: SaveHotelCommentPort,
    private readonly _userLoaderService: LoadUserByIdPort,
    private readonly _hotelLoaderService: LoadHotelByIdPort
  ) {}

  public async getHotelCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]> {
    return this._hotelCommentLoaderService.loadHotelCommentList(commentSortingParams);
  }

  public async createHotelComment(commentParams: IHotelCommentParams): Promise<CommentEntity> {
    const user = await this._userLoaderService.loadUserById(commentParams.userId);
    if (!user) {
      return;
    }
    const hotel = await this._hotelLoaderService.loadHotelById(commentParams.hotelId);
    if (!hotel) {
      return;
    }
    const commentEntity = CommentEntity.create({
      id: commentParams.id,
      text: commentParams.text,
      createdAt: commentParams.createdAt,
      rating: commentParams.rating,
      hotel,
      user
    });
    return this._hotelCommentSaverService.saveHotelComment(commentEntity);
  }


}
