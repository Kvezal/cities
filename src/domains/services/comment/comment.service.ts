import { CommentEntity, IComment, RatingEntity } from 'domains/entities';
import { ICommentSorting } from 'domains/interfaces';
import {
  CheckRatingPort,
  LoadHotelByIdPort,
  LoadHotelCommentListPort,
  LoadUserByIdPort,
  SaveHotelCommentPort,
  SaveRatingPort, UpdateRatingPort,
} from 'domains/ports';
import { GetHotelCommentListQuery } from 'domains/queries';
import { CreateHotelCommentUseCase } from 'domains/use-cases';


export class CommentService implements
  GetHotelCommentListQuery,
  CreateHotelCommentUseCase {
  constructor(
    private readonly _hotelCommentLoaderService: LoadHotelCommentListPort,
    private readonly _hotelCommentSaverService: SaveHotelCommentPort,
    private readonly _userLoaderService: LoadUserByIdPort,
    private readonly _hotelLoaderService: LoadHotelByIdPort,
    private readonly _ratingSaverService: SaveRatingPort,
    private readonly _ratingUpdaterService: UpdateRatingPort,
    private readonly _ratingCheckerService: CheckRatingPort
  ) {}


  public async getHotelCommentList(commentSortingParams: ICommentSorting): Promise<CommentEntity[]> {
    return this._hotelCommentLoaderService.loadHotelCommentList(commentSortingParams);
  }


  public async createHotelComment(commentParams: IComment): Promise<CommentEntity> {
    const userEntity = await this._userLoaderService.loadUserById(commentParams.userId);
    if (!userEntity) {
      throw new Error(`user with ${commentParams.userId} id is not existed`);
    }

    const hotelEntity = await this._hotelLoaderService.loadHotelById(commentParams.hotelId);
    if (!hotelEntity) {
      throw new Error(`hotel with ${commentParams.hotelId} id is not existed`);
    }

    const ratingEntity = RatingEntity.create({
      userId: commentParams.userId,
      hotelId: commentParams.hotelId,
      value: commentParams.rating,
    });
    const hasRating = await this._ratingCheckerService.checkRating(ratingEntity);
    if (hasRating) {
      await this._ratingUpdaterService.updateRating(ratingEntity);
    } else {
      await this._ratingSaverService.saveRating(ratingEntity);
    }

    const commentEntity = CommentEntity.create(commentParams);
    return this._hotelCommentSaverService.saveHotelComment(commentEntity);
  }
}
