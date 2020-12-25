import { CommentEntity } from 'domains/entities';

import { ICommentTableParams } from 'modules/db/interfaces';
import { UserMapper } from 'modules/adapters';


export class CommentMapper {
  static mapToDomain(tableParams: ICommentTableParams): CommentEntity {
    return CommentEntity.create({
      id: tableParams.id,
      text: tableParams.text,
      createdAt: new Date(tableParams.created_at),
      rating: tableParams.rating,
      hotelId: tableParams.hotel_id,
      user: UserMapper.mapToDomain(tableParams.user),
    });
  }

  static mapToTableParams(domain: CommentEntity): ICommentTableParams {
    return {
      id: domain.id,
      text: domain.text,
      created_at: domain.createdAt.toISOString(),
      rating: domain.rating,
      hotel_id: domain.hotelId,
      user: UserMapper.mapToTableParams(domain.user),
    };
  }
}
