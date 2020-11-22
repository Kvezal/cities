import { CommentEntity, RatingEntity } from 'domains/entities';
import { ICommentSorting, IHotelCommentParams } from 'domains/interfaces';
import {
  LoadHotelByIdPort,
  LoadHotelCommentListPort,
  LoadRatingPort,
  LoadUserByIdPort,
  SaveHotelCommentPort,
  SaveRatingPort,
  UpdateRatingPort,
} from 'domains/ports';
import { GetHotelCommentListQuery } from 'domains/queries';
import { CreateHotelCommentUseCase } from 'domains/use-cases';


export class CommentService implements
  GetHotelCommentListQuery,
  CreateHotelCommentUseCase {
  constructor(
    private readonly _hotelCommentLoaderService: LoadHotelCommentListPort,
    private readonly _hotelCommentSaverService: SaveHotelCommentPort,
    private readonly _ratingLoaderService: LoadRatingPort,
    private readonly _ratingSaverService: SaveRatingPort,
    private readonly _ratingUpdaterService: UpdateRatingPort,
    private readonly _userLoaderService: LoadUserByIdPort,
    private readonly _hotelLoaderService: LoadHotelByIdPort
  ) {}

  public async getHotelCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]> {
    return this._hotelCommentLoaderService.loadHotelCommentList(commentSortingParams);
  }

  public async createHotelComment(commentParams: IHotelCommentParams): Promise<CommentEntity> {
    const user = await this._userLoaderService.loadUserById(commentParams.userId);
    if (!user) {
      throw new Error(`user with ${commentParams.userId} id is not existed`);
    }
    const hotel = await this._hotelLoaderService.loadHotelById(commentParams.hotelId);
    if (!hotel) {
      throw new Error(`hotel with ${commentParams.hotelId} id is not existed`);
    }
    const rating = await this._ratingLoaderService.loadRating(commentParams.userId, commentParams.hotelId);
    let ratingEntity: RatingEntity;
    if (rating) {
      ratingEntity = await this._ratingUpdaterService.updateRating(RatingEntity.create(commentParams.rating))
    } else {
      ratingEntity = await this._ratingSaverService.saveRating(RatingEntity.create(commentParams.rating));
    }
    const commentEntity = CommentEntity.create({
      id: commentParams.id,
      text: commentParams.text,
      createdAt: commentParams.createdAt,
      rating: ratingEntity,
      hotel,
      user
    });
    return this._hotelCommentSaverService.saveHotelComment(commentEntity);
  }


}
