import { Injectable } from '@nestjs/common';
import { LoadHotelByIdPort, LoadHotelCommentListPort, LoadUserByIdPort, SaveHotelCommentPort } from 'domains/ports';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentOrmEntity, HotelOrmEntity, RatingOrmEntity, UserOrmEntity } from 'modules/orm-entities';
import { Repository } from 'typeorm';


@Injectable()
export class CommentAdapterService implements
  LoadHotelCommentListPort,
  SaveHotelCommentPort,
  LoadUserByIdPort,
  LoadHotelByIdPort {
  constructor(
    @InjectRepository(HotelOrmEntity) private readonly _hotelRepository: Repository<HotelOrmEntity>,
    @InjectRepository(UserOrmEntity) private readonly _userRepository: Repository<UserOrmEntity>,
    @InjectRepository(CommentOrmEntity) private readonly _commentRepository: Repository<CommentOrmEntity>,
    @InjectRepository(RatingOrmEntity) private readonly _ratingRepository: Repository<RatingOrmEntity>
  ) {}


}
