import { CommentEntity } from 'domains/entities';
import { CommentOrmEntity } from 'modules/orm-entities';

import { HotelMapper } from '../hotel';
import { RatingMapper } from '../rating';
import { UserMapper } from '../user';


export class CommentMapper {
  static mapToDomain(ormEntity: CommentOrmEntity): CommentEntity {
    return CommentEntity.create({
      id: ormEntity.id,
      text: ormEntity.text,
      createdAt: ormEntity.createdAt,
      hotel: HotelMapper.mapToDomain(ormEntity.hotel),
      user: UserMapper.mapToDomain(ormEntity.user),
      rating: RatingMapper.mapToDomain(ormEntity.rating),
    });
  }

  static mapToOrmEntity(domain: CommentEntity): CommentOrmEntity {
    const ormEntity = new CommentOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.text = domain.text;
    ormEntity.createdAt = domain.createdAt;
    ormEntity.hotel = HotelMapper.mapToDomain(domain.hotel);
    ormEntity.user = UserMapper.mapToDomain(domain.user);
    ormEntity.rating = RatingMapper.mapToDomain(domain.rating);
    return ormEntity;
  }
}
